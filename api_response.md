Get all Tutors: http://assign-4-l2-b6-skill-bridge-backend.vercel.app/api/tutor

Response:
{
    "data": [
        {
            "id": "cmky0zp270000ccd186nste98",
            "userId": "IzhmhxJDZiZYCfE96MEn0EPZGdoxIWZo",
            "bio": "I am an experienced software developer with over 5 years of teaching experience. I specialize in web development and have helped hundreds of students.",
            "expertise": [
                "JavaScript",
                "React",
                "Node.js",
                "TypeScript"
            ],
            "hourlyRate": 50,
            "experience": "5 years of professional teaching",
            "education": "BS in Computer Science from XYZ University",
            "rating": 5,
            "totalReviews": 1,
            "totalSessions": 0,
            "availability": [
                {
                    "day": "Monday",
                    "slots": [
                        "09:00-10:00",
                        "10:00-11:00",
                        "14:00-15:00"
                    ]
                },
                {
                    "day": "Wednesday",
                    "slots": [
                        "09:00-10:00",
                        "11:00-12:00"
                    ]
                }
            ],
            "isApproved": true,
            "createdAt": "2026-01-28T12:52:51.948Z",
            "updatedAt": "2026-01-28T18:23:49.790Z",
            "user": {
                "id": "IzhmhxJDZiZYCfE96MEn0EPZGdoxIWZo",
                "name": "Murad",
                "email": "murad@gmail.com",
                "image": null,
                "phone": null
            },
            "categories": [
                {
                    "id": "cmkxvbejr00003wd1jplrkgbl",
                    "name": "Mathematics",
                    "icon": "📐"
                }
            ],
            "_count": {
                "categories": 1
            }
        }
    ],
    "pagination": {
        "total": 1,
        "page": 1,
        "limit": 10,
        "totalPages": 1
    }
}

Get Tutor by ID: http://assign-4-l2-b6-skill-bridge-backend.vercel.app/api/tutor/cmky0zp270000ccd186nste98

Response: 
{
    "id": "cmky0zp270000ccd186nste98",
    "userId": "IzhmhxJDZiZYCfE96MEn0EPZGdoxIWZo",
    "bio": "I am an experienced software developer with over 5 years of teaching experience. I specialize in web development and have helped hundreds of students.",
    "expertise": [
        "JavaScript",
        "React",
        "Node.js",
        "TypeScript"
    ],
    "hourlyRate": 50,
    "experience": "5 years of professional teaching",
    "education": "BS in Computer Science from XYZ University",
    "rating": 5,
    "totalReviews": 1,
    "totalSessions": 0,
    "availability": [
        {
            "day": "Monday",
            "slots": [
                "09:00-10:00",
                "10:00-11:00",
                "14:00-15:00"
            ]
        },
        {
            "day": "Wednesday",
            "slots": [
                "09:00-10:00",
                "11:00-12:00"
            ]
        }
    ],
    "isApproved": true,
    "createdAt": "2026-01-28T12:52:51.948Z",
    "updatedAt": "2026-01-28T18:23:49.790Z",
    "user": {
        "id": "IzhmhxJDZiZYCfE96MEn0EPZGdoxIWZo",
        "name": "Murad",
        "email": "murad@gmail.com",
        "image": null,
        "phone": null,
        "createdAt": "2026-01-28T09:36:27.763Z"
    },
    "categories": [
        {
            "id": "cmkxvbejr00003wd1jplrkgbl",
            "name": "Mathematics",
            "description": "Math tutoring for all levels Updated",
            "icon": "📐"
        }
    ]
}