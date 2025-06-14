const GoGreen = require('./goGreen');
const moment = require('moment');

async function runExamples() {
    const goGreen = new GoGreen();
    
    // Initialize repository
    await goGreen.initializeRepo();
    
    console.log('🌱 Welcome to goGreen - GitHub Activity Generator!');
    console.log('Choose an example to run:\n');
    
    // Example 1: Fill last 30 days with random commits
    console.log('Example 1: Fill last 30 days');
    const fillLast30Days = async () => {
        const endDate = moment().format('YYYY-MM-DD');
        const startDate = moment().subtract(30, 'days').format('YYYY-MM-DD');
        
        console.log(`Generating commits from ${startDate} to ${endDate}`);
        await goGreen.generateCommitsForRange(startDate, endDate, 1, 4);
        goGreen.saveCommitsData();
    };
    
    // Example 2: Create a simple pattern (heart shape)
    console.log('\nExample 2: Create heart pattern');
    const createHeartPattern = async () => {
        // Simple heart pattern (7 weeks x 7 days)
        const heartPattern = [
            [0, 1, 1, 0, 1, 1, 0],
            [1, 2, 2, 1, 2, 2, 1],
            [1, 2, 2, 2, 2, 2, 1],
            [0, 1, 2, 2, 2, 1, 0],
            [0, 0, 1, 2, 1, 0, 0],
            [0, 0, 0, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0]
        ];
        
        const startDate = moment().subtract(7, 'weeks').format('YYYY-MM-DD');
        console.log(`Creating heart pattern starting from ${startDate}`);
        await goGreen.createPattern(heartPattern, startDate);
        goGreen.saveCommitsData();
    };
    
    // Example 3: Fill specific date range with high activity
    console.log('\nExample 3: High activity period');
    const createHighActivityPeriod = async () => {
        const startDate = '2024-01-01';
        const endDate = '2024-01-31';
        
        console.log(`Creating high activity period from ${startDate} to ${endDate}`);
        await goGreen.generateCommitsForRange(startDate, endDate, 3, 8);
        goGreen.saveCommitsData();
    };
    
    // Example 4: Sparse commits over a year
    console.log('\nExample 4: Sparse commits over a year');
    const createYearlyActivity = async () => {
        const endDate = moment().format('YYYY-MM-DD');
        const startDate = moment().subtract(1, 'year').format('YYYY-MM-DD');
        
        console.log(`Creating sparse activity from ${startDate} to ${endDate}`);
        await goGreen.generateCommitsForRange(startDate, endDate, 0, 2);
        goGreen.saveCommitsData();
    };
    
    // Uncomment the example you want to run:
    
    // await fillLast30Days();
    // await createHeartPattern();
    // await createHighActivityPeriod();
    // await createYearlyActivity();
    
    console.log('\n💡 Uncomment one of the examples above to run it!');
    console.log('📝 Edit the dates and patterns to customize your GitHub activity.');
    console.log('⚠️  Remember: This creates real commits in your repository!');
}

// Run examples
runExamples().catch(console.error);
