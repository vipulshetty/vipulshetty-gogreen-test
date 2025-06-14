# 🌱 goGreen - Ultra-Realistic GitHub Activity Generator

Create **completely natural-looking** GitHub activity that's indistinguishable from real developer work!

## 🎯 SUPER EASY USAGE

### One Command = Perfect Activity
```bash
npm run go
```
**That's it!** Creates 6 months of ultra-realistic activity with:
- ✅ 50-60% empty days (very realistic!)
- ✅ Natural vacation gaps (3-7 days)
- ✅ Weekend breaks (70% less activity)
- ✅ Sick days and Monday blues
- ✅ Professional commit messages
- ✅ Realistic timing patterns

### Other Easy Options
```bash
npm run easy    # 1 month of realistic activity
npm start       # Interactive mode
```

## 🚀 Quick Setup

### Prerequisites
- Node.js installed on your system
- Git installed and configured

### Installation

1. **Clone or download this repository**
   ```bash
   git clone <your-repo-url>
   cd goGreen
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Initialize your repository** (if not already done)
   ```bash
   git init
   ```

## 📖 Usage

### Basic Usage

```javascript
const GoGreen = require('./goGreen');
const moment = require('moment');

const goGreen = new GoGreen();

// Initialize repository
await goGreen.initializeRepo();

// Generate commits for the last 30 days
const endDate = moment().format('YYYY-MM-DD');
const startDate = moment().subtract(30, 'days').format('YYYY-MM-DD');

await goGreen.generateCommitsForRange(startDate, endDate, 1, 3);
goGreen.saveCommitsData();
```

### Run Examples

```bash
node examples.js
```

Edit the `examples.js` file to uncomment and run different examples:
- Fill last 30 days with activity
- Create heart pattern
- High activity periods
- Sparse yearly activity

### Custom Patterns

Create custom patterns by defining a 2D array where each number represents commit intensity:

```javascript
const pattern = [
    [0, 1, 1, 0, 1, 1, 0],  // Week 1
    [1, 2, 2, 1, 2, 2, 1],  // Week 2
    [1, 2, 2, 2, 2, 2, 1],  // Week 3
    // ... more weeks
];

await goGreen.createPattern(pattern, '2024-01-01');
```

## 🛠️ API Reference

### `generateCommitsForRange(startDate, endDate, minCommits, maxCommits)`
Generate random commits for a date range.

- `startDate`: Start date (YYYY-MM-DD format)
- `endDate`: End date (YYYY-MM-DD format)
- `minCommits`: Minimum commits per day (default: 1)
- `maxCommits`: Maximum commits per day (default: 5)

### `createPattern(pattern, startDate)`
Create commits based on a 2D pattern array.

- `pattern`: 2D array representing weeks and days
- `startDate`: Starting date for the pattern

### `createCommit(date)`
Create a single commit for a specific date.

- `date`: Moment.js date object

## 📦 Dependencies

- **moment** - Date and time manipulation
- **simple-git** - Git command wrapper
- **random** - Random number generation

## ⚠️ Important Notes

1. **This creates real commits** in your repository
2. **Backup your repository** before running large operations
3. **Use responsibly** - Don't abuse GitHub's contribution system
4. **Test first** with small date ranges
5. **Remember to push** your commits to GitHub to see them on your profile

## 🎯 Ideas for Improvement

- [ ] Custom commit message templates
- [ ] GUI interface for pattern creation
- [ ] Import/export pattern files
- [ ] Undo functionality
- [ ] Integration with GitHub API
- [ ] Text-to-pattern converter
- [ ] Seasonal patterns (Christmas tree, etc.)

## 📄 License

This project is for educational purposes. Use responsibly and in accordance with GitHub's terms of service.

## 🙏 Credits

Inspired by various GitHub activity generators and the desire to make contribution graphs more interesting!

---

**Happy coding! 🚀**
