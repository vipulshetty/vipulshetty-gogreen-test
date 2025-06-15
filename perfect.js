const GoGreen = require('./goGreen');
const moment = require('moment');

async function perfectActivity() {
    console.log('🎯 Perfect GitHub Activity Generator');
    console.log('===================================');
    console.log('Creating exactly what you want: ~300 commits for 2024!\n');
    
    const goGreen = new GoGreen();
    await goGreen.initializeRepo();
    
    // Calculate 2024 dates - 370 days to complete the year
    const endDate = '2024-12-31'; // End of 2024
    const startDate = moment('2024-12-31').subtract(370, 'days').format('YYYY-MM-DD');
    
    console.log(`🚀 Generating activity for 2024:`);
    console.log(`📅 From: ${startDate} to ${endDate} (370 days)`);
    console.log(`🎯 Target: ~300 commits (perfect amount!)`);
    console.log(`📊 This will be: ~0.8 commits per day average\n`);
    
    // Create a custom activity level for exactly ~300 commits
    goGreen.randomizer.activityLevel = 'perfect300';
    
    await goGreen.generateCommitsForRange(startDate, endDate, 0, 0, true);
    goGreen.saveCommitsData();
    
    // Calculate stats
    const totalDays = 370;
    const daysWithCommits = new Set(goGreen.commitsData.map(c => moment(c.date).format('YYYY-MM-DD'))).size;
    const daysWithoutCommits = totalDays - daysWithCommits;
    const percentageEmpty = Math.round((daysWithoutCommits / totalDays) * 100);
    const avgCommitsPerDay = Math.round((goGreen.commitsData.length / daysWithCommits) * 10) / 10;
    
    console.log('✅ PERFECT! Here\'s your 2024 activity:');
    console.log('======================================');
    console.log(`📅 Period: ${startDate} to ${endDate} (370 days)`);
    console.log(`📝 Total commits: ${goGreen.commitsData.length}`);
    console.log(`📈 Active days: ${daysWithCommits}`);
    console.log(`📉 Empty days: ${daysWithoutCommits} (${percentageEmpty}%)`);
    console.log(`⚡ Average commits per active day: ${avgCommitsPerDay}`);
    console.log(`🎯 Perfect amount - not too much, not too little!\n`);
    
    console.log('🎉 This will give you a nice, consistent 2024 activity!');
    console.log('🚀 Ready to push to GitHub! 🟢');
}

perfectActivity().catch(console.error);
