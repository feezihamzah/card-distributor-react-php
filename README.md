# 1. Card Distributor - React + PHP Project

## Description:
This project allows a user to enter a number of people and then evenly distributes 52 shuffled playing cards among them by fetching card data from a PHP backend.  
Each card flips from the back to front using Framer Motion animation.
 * This project allows a user to enter a number of people and then evenly distributes
 * 52 shuffled playing cards among them by fetching card data from a PHP backend.
 * Each card flips from the back to front using Framer Motion animation.

## Remarks:
- Total Time Spent: 2 hours 15 minutes

## Tech Stack:
- **Frontend**: React v16+ (Create React App)
- **Backend**: PHP 7 (compatible with PHP 7.0+)

## Setup Instructions:

### PHP Backend (in `/cards/distribute.php`):
- Make sure you have XAMPP or any PHP server installed
- Place `distribute.php` in `{domain_name}/cards/`
- Ensure card images (e.g., `S-A.png`, `D-K.png`) are in `htdocs/cards/`

### React Frontend:
```bash
npm install
npm install framer-motion
npm start
```

# 2. Optimization Strategy Explained
## Issue	Optimization
---------------------------------------------------------------------------
| Change                            | Benefit                              |
| --------------------------------- | ------------------------------------ |
| Use `FULLTEXT` search             | Avoids full scans with `%LIKE%`      |
| Use `UNION` instead of many `OR`s | Optimizes index usage                |
| Remove `GROUP BY` if not needed   | Improves sort performance            |
| Add indexes                       | Speeds up filtering and sorting      |
---------------------------------------------------------------------------
### 1. Use Full-Text Index Instead of Many LIKE

### 2. Remove Unnecessary LEFT JOINs
Only JOIN related tables if you're using their data in SELECT, WHERE, or ORDER BY.

### 3. Avoid GROUP BY Without Aggregation
If you're not using COUNT(), SUM(), etc., then:
GROUP BY Jobs.id
…is redundant (and expensive). Remove it unless you’re aggregating.

### 4. Add Proper Indexes
Make sure the following columns are indexed:
```bash
CREATE INDEX idx_jobs_publish_deleted ON jobs(publish_status, deleted);
CREATE INDEX idx_jobs_sort_id ON jobs(sort_order, id);
CREATE INDEX idx_jobtypes_name ON job_types(name);
CREATE INDEX idx_jobcategories_name ON job_categories(name);
```
