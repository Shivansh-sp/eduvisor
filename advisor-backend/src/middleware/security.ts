import { Request, Response, NextFunction } from 'express';
import rateLimit from 'express-rate-limit';
import slowDown from 'express-slow-down';
import validator from 'validator';
import xss from 'xss';

// Rate limiting middleware
export const createRateLimit = (windowMs: number, max: number, message?: string) => {
  return rateLimit({
    windowMs,
    max,
    message: {
      success: false,
      error: message || 'Too many requests from this IP, please try again later.'
    },
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req: Request, res: Response) => {
      res.status(429).json({
        success: false,
        error: 'Rate limit exceeded. Please try again later.',
        retryAfter: Math.round(windowMs / 1000)
      });
    }
  });
};

// Speed limiting middleware
export const createSpeedLimit = (windowMs: number, delayAfter: number, delayMs: number) => {
  return slowDown({
    windowMs,
    delayAfter,
    delayMs: () => delayMs,
    maxDelayMs: delayMs * 10,
    validate: { delayMs: false }
  });
};

// Input validation and sanitization middleware
export const validateAndSanitize = (fields: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      for (const field of fields) {
        if (req.body[field]) {
          // XSS protection
          if (typeof req.body[field] === 'string') {
            req.body[field] = xss(req.body[field]);
            
            // Additional validation based on field type
            if (field.includes('email') && !validator.isEmail(req.body[field])) {
              return res.status(400).json({
                success: false,
                error: `Invalid ${field} format`
              });
            }
            
            if (field.includes('url') && !validator.isURL(req.body[field])) {
              return res.status(400).json({
                success: false,
                error: `Invalid ${field} format`
              });
            }
            
            // Length validation
            if (req.body[field].length > 1000) {
              return res.status(400).json({
                success: false,
                error: `${field} is too long`
              });
            }
          }
        }
      }
      next();
    } catch (error) {
      res.status(400).json({
        success: false,
        error: 'Invalid input data'
      });
    }
  };
};

// SQL Injection protection (for MongoDB, prevents NoSQL injection)
export const preventNoSQLInjection = (req: Request, res: Response, next: NextFunction) => {
  const sanitize = (obj: any): any => {
    if (obj && typeof obj === 'object') {
      for (const key in obj) {
        if (typeof obj[key] === 'string') {
          // Remove potentially dangerous operators
          obj[key] = obj[key].replace(/^\$/, '');
        } else if (typeof obj[key] === 'object') {
          obj[key] = sanitize(obj[key]);
        }
      }
    }
    return obj;
  };

  req.body = sanitize(req.body);
  req.query = sanitize(req.query);
  req.params = sanitize(req.params);
  
  next();
};

// Content Security Policy headers
export const setSecurityHeaders = (req: Request, res: Response, next: NextFunction) => {
  // Content Security Policy
  res.setHeader('Content-Security-Policy', 
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://apis.google.com; " +
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
    "font-src 'self' https://fonts.gstatic.com; " +
    "img-src 'self' data: https:; " +
    "connect-src 'self' https://api.eduadvisor.com; " +
    "frame-ancestors 'none';"
  );
  
  // Additional security headers
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 
    'camera=(), microphone=(), geolocation=(), payment=()');
  
  next();
};

// Request logging for security monitoring
export const securityLogger = (req: Request, res: Response, next: NextFunction) => {
  const startTime = Date.now();
  const originalSend = res.send;
  
  res.send = function(data: any) {
    const duration = Date.now() - startTime;
    
    // Log suspicious activities
    const suspiciousPatterns = [
      /(\$ne|\$gt|\$lt|\$in|\$nin)/i, // NoSQL injection attempts
      /(union|select|insert|delete|drop|create)/i, // SQL injection attempts
      /(<script|javascript:|vbscript:|onload|onerror)/i, // XSS attempts
      /(\.\.\/|\.\.\\)/i, // Path traversal attempts
    ];
    
    const requestData = JSON.stringify(req.body) + JSON.stringify(req.query);
    const isSuspicious = suspiciousPatterns.some(pattern => pattern.test(requestData));
    
    if (isSuspicious || res.statusCode >= 400 || duration > 5000) {
      console.warn('Security Alert:', {
        timestamp: new Date().toISOString(),
        ip: req.ip,
        method: req.method,
        url: req.originalUrl,
        userAgent: req.get('User-Agent'),
        statusCode: res.statusCode,
        duration,
        suspicious: isSuspicious,
        body: req.body,
        query: req.query
      });
    }
    
    return originalSend.call(this, data);
  };
  
  next();
};

// API versioning middleware
export const apiVersioning = (req: Request, res: Response, next: NextFunction) => {
  const version = req.headers['api-version'] as string || req.query.v as string || '1.0';
  
  if (!['1.0', '1.1'].includes(version)) {
    return res.status(400).json({
      success: false,
      error: 'Unsupported API version',
      supportedVersions: ['1.0', '1.1']
    });
  }
  
  req.apiVersion = version;
  next();
};

// Request size limiting
export const requestSizeLimit = (maxSize: number = 1024 * 1024) => { // 1MB default
  return (req: Request, res: Response, next: NextFunction) => {
    const contentLength = parseInt(req.headers['content-length'] || '0');
    
    if (contentLength > maxSize) {
      return res.status(413).json({
        success: false,
        error: 'Request payload too large',
        maxSize: `${maxSize / 1024 / 1024}MB`
      });
    }
    
    next();
  };
};

// CORS configuration
export const corsOptions = {
  origin: (origin: string | undefined, callback: Function) => {
    const allowedOrigins = [
      'http://localhost:3000',
      'https://eduadvisor.app',
      'https://www.eduadvisor.app'
    ];
    
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'API-Version']
};

// JWT token validation enhancement
export const enhancedJWTValidation = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (token) {
    // Check token blacklist (implement Redis for production)
    const blacklistedTokens = new Set(); // In production, use Redis
    
    if (blacklistedTokens.has(token)) {
      return res.status(401).json({
        success: false,
        error: 'Token has been revoked'
      });
    }
    
    // Additional token validation can be added here
  }
  
  next();
};

declare global {
  namespace Express {
    interface Request {
      apiVersion?: string;
    }
  }
}
