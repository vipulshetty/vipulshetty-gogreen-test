const GoGreen = require('./goGreen');
const moment = require('moment');

async function demo() {
    console.log('🎯 goGreen Demo - Different Activity Levels');
    console.log('===========================================\n');
    
    const goGreen = new GoGreen();
    await goGreen.initializeRepo();
    
    console.log('🚀 Generating 90 days of HIGH activity...');
    console.log('This will have more commits and fewer empty days!\n');
    
    const endDate = moment().format('YYYY-MM-DD');
    const startDate = moment().subtract(90, 'days').format('YYYY-MM-DD');
    
    // Set high activity level
    goGreen.randomizer.activityLevel = 'high';
    
    await goGreen.generateCommitsForRange(startDate, endDate, 0, 0, true);
    goGreen.saveCommitsData();
    
    // Calculate stats
    const totalDays = 90;
    const daysWithCommits = new Set(goGreen.commitsData.map(c => moment(c.date).format('YYYY-MM-DD'))).size;
    const daysWithoutCommits = totalDays - daysWithCommits;
    const percentageEmpty = Math.round((daysWithoutCommits / totalDays) * 100);
    const avgCommitsPerDay = Math.round((goGreen.commitsData.length / daysWithCommits) * 10) / 10;
    
    console.log('✅ DONE! HIGH Activity Results:');
    console.log('===============================');
    console.log(`📅 Period: ${startDate} to ${endDate} (90 days)`);
    console.log(`📝 Total commits: ${goGreen.commitsData.length}`);
    console.log(`📈 Active days: ${daysWithCommits}`);
    console.log(`📉 Empty days: ${daysWithoutCommits} (${percentageEmpty}%)`);
    console.log(`⚡ Average commits per active day: ${avgCommitsPerDay}`);
    console.log(`🎯 Activity level: HIGH\n`);
    
    console.log('🎉 Much more activity than before!');
    console.log('This looks like a very active developer! 🚀\n');
    
    console.log('📋 Activity Level Comparison:');
    console.log('• LIGHT: ~60% empty days, 1-2 commits per active day');
    console.log('• MODERATE: ~36% empty days, 1-3 commits per active day');
    console.log('• HIGH: ~17% empty days, 2-5 commits per active day');
    console.log('• MIXED: Realistic with busy periods (3-8 commits)\n');
    
    console.log('🚀 To use the interactive version: npm run simple');
}

demo().catch(console.error);
