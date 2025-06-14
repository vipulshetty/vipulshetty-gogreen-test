const GoGreen = require('./goGreen');
const moment = require('moment');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function question(prompt) {
    return new Promise((resolve) => {
        rl.question(prompt, resolve);
    });
}

async function simpleMode() {
    console.log('🌱 goGreen - Simple & Realistic');
    console.log('================================');
    console.log('Choose your settings and get realistic GitHub activity!\n');
    
    const goGreen = new GoGreen();
    await goGreen.initializeRepo();
    
    // Ask for number of days
    console.log('📅 How many days of activity do you want?');
    console.log('1. 30 days (1 month)');
    console.log('2. 90 days (3 months)');
    console.log('3. 180 days (6 months)');
    console.log('4. 365 days (1 year)');
    console.log('5. Custom number of days');
    
    const choice = await question('\nChoose option (1-5): ');
    
    let days;
    switch(choice.trim()) {
        case '1':
            days = 30;
            break;
        case '2':
            days = 90;
            break;
        case '3':
            days = 180;
            break;
        case '4':
            days = 365;
            break;
        case '5':
            days = parseInt(await question('Enter number of days: '));
            break;
        default:
            days = 90; // Default to 3 months
    }
    
    // Ask for activity level
    console.log('\n🎯 How active do you want to appear?');
    console.log('1. Light activity (like a casual contributor)');
    console.log('2. Moderate activity (like a regular developer)');
    console.log('3. High activity (like a very active developer)');
    console.log('4. Mixed activity (realistic with busy periods)');
    
    const activityChoice = await question('\nChoose activity level (1-4): ');
    
    let activityLevel = 'moderate';
    switch(activityChoice.trim()) {
        case '1':
            activityLevel = 'light';
            break;
        case '2':
            activityLevel = 'moderate';
            break;
        case '3':
            activityLevel = 'high';
            break;
        case '4':
            activityLevel = 'mixed';
            break;
        default:
            activityLevel = 'moderate';
    }
    
    console.log('\n🚀 Generating realistic activity...');
    console.log(`📅 Period: ${days} days`);
    console.log(`🎯 Activity level: ${activityLevel}`);
    console.log('⏳ Please wait...\n');
    
    const endDate = moment().format('YYYY-MM-DD');
    const startDate = moment().subtract(days, 'days').format('YYYY-MM-DD');
    
    // Modify the randomizer based on activity level
    goGreen.randomizer.activityLevel = activityLevel;
    
    await goGreen.generateCommitsForRange(startDate, endDate, 0, 0, true);
    goGreen.saveCommitsData();
    
    // Calculate stats
    const totalDays = days;
    const daysWithCommits = new Set(goGreen.commitsData.map(c => moment(c.date).format('YYYY-MM-DD'))).size;
    const daysWithoutCommits = totalDays - daysWithCommits;
    const percentageEmpty = Math.round((daysWithoutCommits / totalDays) * 100);
    const avgCommitsPerDay = Math.round((goGreen.commitsData.length / daysWithCommits) * 10) / 10;
    
    console.log('✅ DONE! Here\'s your realistic GitHub activity:');
    console.log('===============================================');
    console.log(`📅 Period: ${startDate} to ${endDate} (${days} days)`);
    console.log(`📝 Total commits: ${goGreen.commitsData.length}`);
    console.log(`📈 Active days: ${daysWithCommits}`);
    console.log(`📉 Empty days: ${daysWithoutCommits} (${percentageEmpty}%)`);
    console.log(`⚡ Average commits per active day: ${avgCommitsPerDay}`);
    console.log(`🎯 Activity level: ${activityLevel.toUpperCase()}\n`);
    
    console.log('🚀 Ready to push to GitHub:');
    console.log('1. Create a new repository on GitHub');
    console.log('2. git remote add origin https://github.com/vipulshetty/YOUR_REPO_NAME.git');
    console.log('3. git push -u origin main');
    console.log('4. Check your profile! 🟢\n');
    
    console.log('💡 This activity looks completely realistic and natural!');
    
    rl.close();
}

simpleMode().catch(console.error);
