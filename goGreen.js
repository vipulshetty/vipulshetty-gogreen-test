const moment = require('moment');
const simpleGit = require('simple-git');
const fs = require('fs');

// Helper function for random integers
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Realistic random generator that mimics real developer behavior
class RealisticRandomizer {
    constructor() {
        // Weekday vs weekend activity patterns
        this.weekdayHours = [9, 10, 11, 14, 15, 16, 17, 18, 19, 20, 21]; // More active during work hours
        this.weekendHours = [10, 11, 14, 15, 16, 19, 20, 21, 22]; // More relaxed weekend coding

        // Realistic commit patterns
        this.commitBursts = [1, 1, 1, 2, 2, 3, 5, 8]; // Most days have 1-3 commits, occasional bursts
        this.weekendMultiplier = 0.6; // Less activity on weekends
        this.holidayMultiplier = 0.3; // Much less activity on holidays

        // Vacation tracking
        this.vacationDaysLeft = 0;

        // Activity level (can be modified)
        this.activityLevel = 'moderate';

        // Realistic commit message patterns
        this.commitTypes = {
            'feat': 0.25,     // 25% new features
            'fix': 0.30,      // 30% bug fixes
            'docs': 0.10,     // 10% documentation
            'refactor': 0.15, // 15% refactoring
            'test': 0.08,     // 8% tests
            'chore': 0.12     // 12% maintenance
        };
    }

    // Get realistic number of commits for a given date
    getCommitsForDate(date) {
        const dayOfWeek = date.day(); // 0 = Sunday, 6 = Saturday
        const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
        const isHoliday = this.isHoliday(date);
        const isMonday = dayOfWeek === 1;
        const isFriday = dayOfWeek === 5;

        // Different activity patterns based on level
        let commitDistribution;
        switch(this.activityLevel) {
            case 'light':
                commitDistribution = [0, 0, 0, 1, 1, 1, 2]; // ~43% no commits - for ~370 commits/year
                break;
            case 'moderate':
                commitDistribution = [0, 0, 1, 1, 2, 2, 3, 4]; // ~25% no commits - for ~300 commits/6months
                break;
            case 'high':
                commitDistribution = [1, 2, 2, 3, 3, 4, 4, 5, 6, 7, 8]; // 0% no commits
                break;
            case 'mixed':
                // Realistic mixed pattern with busy periods
                if (Math.random() < 0.15) { // 15% chance of busy period
                    commitDistribution = [5, 6, 7, 8, 9, 10, 12]; // Busy period
                } else {
                    commitDistribution = [1, 1, 2, 2, 3, 3, 4]; // Normal period
                }
                break;
            default:
                commitDistribution = [0, 0, 1, 1, 2, 2, 3]; // Default light
        }

        let baseCommits = commitDistribution[randomInt(0, commitDistribution.length - 1)];

        // Weekend behavior - much less restrictive for more commits
        if (isWeekend) {
            let weekendNoCommitChance;
            switch(this.activityLevel) {
                case 'light':
                    weekendNoCommitChance = 0.40; // 40% no weekend commits
                    break;
                case 'moderate':
                    weekendNoCommitChance = 0.30; // 30% no weekend commits
                    break;
                case 'high':
                    weekendNoCommitChance = 0.20; // 20% no weekend commits
                    break;
                case 'mixed':
                    weekendNoCommitChance = 0.25; // 25% no weekend commits
                    break;
                default:
                    weekendNoCommitChance = 0.30;
            }

            if (Math.random() < weekendNoCommitChance) {
                return 0;
            }
            baseCommits = Math.floor(baseCommits * 0.8); // Less reduction for weekends
        }

        // Monday blues - reduced impact
        if (isMonday && Math.random() < 0.15) {
            baseCommits = Math.floor(baseCommits * 0.7);
        }

        // Friday wind-down - minimal impact
        if (isFriday && Math.random() < 0.3) {
            baseCommits = Math.floor(baseCommits * 0.9);
        }

        // Holiday behavior - less restrictive
        if (isHoliday) {
            if (Math.random() < 0.50) {
                return 0; // 50% chance of no commits on holidays
            }
            baseCommits = Math.floor(baseCommits * 0.6);
        }

        // Vacation simulation - shorter and less frequent
        if (Math.random() < 0.008) { // 0.8% chance of starting a vacation
            this.vacationDaysLeft = randomInt(2, 4); // Shorter vacations
        }

        if (this.vacationDaysLeft > 0) {
            this.vacationDaysLeft--;
            return 0; // No commits during vacation
        }

        // Sick days - much less frequent
        if (Math.random() < 0.01) { // 1% chance of sick day
            return 0;
        }

        // Very rare productive days (2% chance)
        if (Math.random() < 0.02) {
            baseCommits = randomInt(4, 8); // Productive day
        }

        // Extremely rare crunch days (0.5% chance)
        if (Math.random() < 0.005) {
            baseCommits = randomInt(10, 20); // Crunch time!
        }

        return Math.max(0, baseCommits);
    }

    // Get realistic hour for commit based on day type
    getRealisticHour(date) {
        const dayOfWeek = date.day();
        const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

        const hours = isWeekend ? this.weekendHours : this.weekdayHours;
        return hours[randomInt(0, hours.length - 1)];
    }

    // Simple holiday detection (you can expand this)
    isHoliday(date) {
        const month = date.month() + 1; // moment months are 0-indexed
        const day = date.date();

        // Common holidays (expand as needed)
        const holidays = [
            '1-1',   // New Year
            '12-25', // Christmas
            '12-31', // New Year's Eve
            '7-4',   // Independence Day (US)
            '11-11', // Veterans Day
        ];

        return holidays.includes(`${month}-${day}`);
    }

    // Generate realistic commit message
    getRealisticCommitMessage() {
        const rand = Math.random();
        let cumulativeProb = 0;
        let selectedType = 'feat';

        for (const [type, prob] of Object.entries(this.commitTypes)) {
            cumulativeProb += prob;
            if (rand <= cumulativeProb) {
                selectedType = type;
                break;
            }
        }

        const messages = {
            'feat': [
                'add user authentication',
                'implement search functionality',
                'add dark mode support',
                'create new dashboard',
                'add file upload feature',
                'implement real-time notifications',
                'add export functionality',
                'create user profile page'
            ],
            'fix': [
                'fix login redirect issue',
                'resolve memory leak',
                'fix responsive design bug',
                'correct validation error',
                'fix API timeout issue',
                'resolve database connection error',
                'fix broken navigation',
                'correct date formatting'
            ],
            'docs': [
                'update README',
                'add API documentation',
                'update installation guide',
                'add code comments',
                'create user manual',
                'update changelog',
                'add contributing guidelines'
            ],
            'refactor': [
                'refactor authentication logic',
                'clean up legacy code',
                'optimize database queries',
                'restructure component hierarchy',
                'improve error handling',
                'simplify configuration',
                'extract reusable components'
            ],
            'test': [
                'add unit tests for auth',
                'create integration tests',
                'add e2e test coverage',
                'update test fixtures',
                'add performance tests',
                'create mock data'
            ],
            'chore': [
                'update dependencies',
                'configure CI/CD pipeline',
                'update build scripts',
                'clean up unused files',
                'update linting rules',
                'configure environment variables'
            ]
        };

        const typeMessages = messages[selectedType];
        const message = typeMessages[randomInt(0, typeMessages.length - 1)];

        return `${selectedType}: ${message}`;
    }
}

class GoGreen {
    constructor() {
        this.git = simpleGit();
        this.commitsData = [];
        this.dataFile = 'commits-data.json';
        this.randomizer = new RealisticRandomizer();
    }

    /**
     * Generate realistic commits for a date range
     * @param {string} startDate - Start date in YYYY-MM-DD format
     * @param {string} endDate - End date in YYYY-MM-DD format
     * @param {number} minCommits - Minimum commits per day (optional, realistic mode ignores this)
     * @param {number} maxCommits - Maximum commits per day (optional, realistic mode ignores this)
     * @param {boolean} useRealistic - Use realistic patterns (default: true)
     */
    async generateCommitsForRange(startDate, endDate, minCommits = 1, maxCommits = 5, useRealistic = true) {
        const start = moment(startDate);
        const end = moment(endDate);

        console.log(`🌱 Generating commits from ${start.format('YYYY-MM-DD')} to ${end.format('YYYY-MM-DD')}`);
        if (useRealistic) {
            console.log('🎯 Using realistic developer patterns');
        }

        const current = start.clone();
        while (current.isSameOrBefore(end)) {
            let commitsForDay;

            if (useRealistic) {
                commitsForDay = this.randomizer.getCommitsForDate(current);
            } else {
                commitsForDay = randomInt(minCommits, maxCommits);
            }

            if (commitsForDay > 0) {
                console.log(`📅 ${current.format('YYYY-MM-DD')}: ${commitsForDay} commits`);
            }

            for (let i = 0; i < commitsForDay; i++) {
                let commitTime;

                if (useRealistic) {
                    const hour = this.randomizer.getRealisticHour(current);
                    commitTime = current.clone()
                        .hour(hour)
                        .minute(randomInt(0, 59))
                        .second(randomInt(0, 59));
                } else {
                    commitTime = current.clone()
                        .hour(randomInt(9, 23))
                        .minute(randomInt(0, 59))
                        .second(randomInt(0, 59));
                }

                await this.createCommit(commitTime, useRealistic);
            }

            current.add(1, 'day');
        }

        console.log('✅ Commits generated successfully!');
    }

    /**
     * Create a single commit for a specific date
     * @param {moment.Moment} date - The date for the commit
     * @param {boolean} useRealistic - Use realistic commit messages
     */
    async createCommit(date, useRealistic = true) {
        const timestamp = date.format();
        const commitMessage = useRealistic ?
            this.randomizer.getRealisticCommitMessage() :
            this.generateCommitMessage();
        
        // Create or update a file with some content
        const fileName = 'activity.txt';
        const content = `Activity generated on ${timestamp}\n${this.generateRandomContent()}\n`;
        
        // Append to file
        fs.appendFileSync(fileName, content);
        
        // Stage the file
        await this.git.add(fileName);
        
        // Commit with the specific date
        await this.git.commit(commitMessage, [], {
            '--date': timestamp
        });
        
        // Store commit data
        this.commitsData.push({
            date: timestamp,
            message: commitMessage
        });
        
        console.log(`📝 Commit created: ${date.format('YYYY-MM-DD HH:mm')} - ${commitMessage}`);
    }

    /**
     * Generate a random commit message
     */
    generateCommitMessage() {
        const messages = [
            'Add new feature',
            'Fix bug',
            'Update documentation',
            'Refactor code',
            'Improve performance',
            'Add tests',
            'Update dependencies',
            'Fix typo',
            'Clean up code',
            'Add comments',
            'Optimize algorithm',
            'Update README',
            'Fix formatting',
            'Add error handling',
            'Update configuration'
        ];
        
        return messages[randomInt(0, messages.length - 1)];
    }

    /**
     * Generate random content for the activity file
     */
    generateRandomContent() {
        const activities = [
            'Working on new features',
            'Debugging issues',
            'Writing documentation',
            'Code review',
            'Testing functionality',
            'Optimizing performance',
            'Updating dependencies',
            'Refactoring legacy code',
            'Adding unit tests',
            'Fixing security issues'
        ];
        
        return activities[randomInt(0, activities.length - 1)];
    }

    /**
     * Create commits for specific pattern (like spelling words)
     * @param {Array} pattern - Array of arrays representing the pattern
     * @param {string} startDate - Start date for the pattern
     */
    async createPattern(pattern, startDate) {
        const start = moment(startDate);
        
        console.log('🎨 Creating pattern on contribution graph...');
        
        for (let week = 0; week < pattern.length; week++) {
            for (let day = 0; day < pattern[week].length; day++) {
                const intensity = pattern[week][day];
                if (intensity > 0) {
                    const commitDate = start.clone().add(week, 'weeks').add(day, 'days');
                    
                    // Create multiple commits based on intensity
                    for (let i = 0; i < intensity; i++) {
                        await this.createCommit(commitDate.clone().add(i * 2, 'hours'));
                    }
                }
            }
        }
        
        console.log('✅ Pattern created successfully!');
    }

    /**
     * Save commits data to JSON file
     */
    saveCommitsData() {
        fs.writeFileSync(this.dataFile, JSON.stringify(this.commitsData, null, 2));
        console.log(`💾 Commits data saved to ${this.dataFile}`);
    }

    /**
     * Load commits data from JSON file
     */
    loadCommitsData() {
        if (fs.existsSync(this.dataFile)) {
            this.commitsData = JSON.parse(fs.readFileSync(this.dataFile, 'utf8'));
            console.log(`📂 Loaded ${this.commitsData.length} commits from ${this.dataFile}`);
        }
    }

    /**
     * Initialize git repository if not already initialized
     */
    async initializeRepo() {
        try {
            await this.git.status();
            console.log('📁 Git repository already initialized');
        } catch (error) {
            console.log('🔧 Initializing git repository...');
            await this.git.init();
            console.log('✅ Git repository initialized');
        }
    }
}

module.exports = GoGreen;

// Example usage if run directly
if (require.main === module) {
    const goGreen = new GoGreen();
    
    // Example: Generate commits for the last 30 days
    const endDate = moment().format('YYYY-MM-DD');
    const startDate = moment().subtract(30, 'days').format('YYYY-MM-DD');
    
    (async () => {
        await goGreen.initializeRepo();
        await goGreen.generateCommitsForRange(startDate, endDate, 1, 3);
        goGreen.saveCommitsData();
    })();
}
