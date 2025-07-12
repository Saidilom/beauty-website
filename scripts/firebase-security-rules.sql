-- Firebase Security Rules for Firestore
-- Copy these rules to your Firebase Console -> Firestore Database -> Rules

rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write access to all documents for authenticated users
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
    
    // Products collection
    match /products/{productId} {
      allow read: if true; // Public read access
      allow write: if request.auth != null && 
        exists(/databases/$(database)/documents/adminUsers/$(request.auth.uid));
    }
    
    // Reviews collection
    match /reviews/{reviewId} {
      allow read: if resource.data.approved == true || 
        (request.auth != null && 
         exists(/databases/$(database)/documents/adminUsers/$(request.auth.uid)));
      allow write: if request.auth != null && 
        exists(/databases/$(database)/documents/adminUsers/$(request.auth.uid));
    }
    
    // FAQ collection
    match /faqs/{faqId} {
      allow read: if resource.data.isActive == true || 
        (request.auth != null && 
         exists(/databases/$(database)/documents/adminUsers/$(request.auth.uid)));
      allow write: if request.auth != null && 
        exists(/databases/$(database)/documents/adminUsers/$(request.auth.uid));
    }
    
    // Orders collection
    match /orders/{orderId} {
      allow read, write: if request.auth != null && 
        exists(/databases/$(database)/documents/adminUsers/$(request.auth.uid));
    }
    
    // Admin users collection
    match /adminUsers/{userId} {
      allow read, write: if request.auth != null && 
        (request.auth.uid == userId || 
         exists(/databases/$(database)/documents/adminUsers/$(request.auth.uid)) &&
         get(/databases/$(database)/documents/adminUsers/$(request.auth.uid)).data.role in ['admin']);
    }
    
    // Site content collection
    match /siteContent/{contentId} {
      allow read: if resource.data.isActive == true || 
        (request.auth != null && 
         exists(/databases/$(database)/documents/adminUsers/$(request.auth.uid)));
      allow write: if request.auth != null && 
        exists(/databases/$(database)/documents/adminUsers/$(request.auth.uid));
    }
    
    // Analytics collection
    match /analytics/{analyticsId} {
      allow read, write: if request.auth != null && 
        exists(/databases/$(database)/documents/adminUsers/$(request.auth.uid));
    }
    
    // Security settings collection
    match /security_settings/{settingsId} {
      allow read, write: if request.auth != null && 
        request.auth.token.admin == true;
    }
    
    // Media files collection
    match /media_files/{fileId} {
      allow read: if true; // Public read access
      allow write: if request.auth != null && 
        request.auth.token.admin == true;
    }
    
    // Uploads collection - admin only
    match /uploads/{uploadId} {
      allow read, write: if request.auth != null && 
        exists(/databases/$(database)/documents/adminUsers/$(request.auth.uid));
    }
    
    // Settings collection - admin only
    match /settings/{settingId} {
      allow read, write: if request.auth != null && 
        exists(/databases/$(database)/documents/adminUsers/$(request.auth.uid)) &&
        get(/databases/$(database)/documents/adminUsers/$(request.auth.uid)).data.role == 'admin';
    }
  }
}

-- Firebase Storage Rules
-- Copy these rules to your Firebase Console -> Storage -> Rules

rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Images folder - public read, admin write
    match /images/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Media folder - public read, admin write
    match /media/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Private admin files
    match /admin/{allPaths=**} {
      allow read, write: if request.auth != null && 
        request.auth.token.admin == true;
    }
    
    // Products folder - public read, admin write
    match /products/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Reviews folder - public read, admin write
    match /reviews/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
