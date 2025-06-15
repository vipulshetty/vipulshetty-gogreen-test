const GoGreen = require('./goGreen');
const moment = require('moment');

async function customActivity() {
    console.log('🎯 Custom GitHub Activity Generator');
    console.log('===================================');
    console.log('Creating exactly what you want:\n');
    console.log('📅 2024: 370 commits (complete the year)');
    console.log('📅 2025: 300 commits (up to today)\n');
    
    const goGreen = new GoGreen();
    await goGreen.initializeRepo();
    
    // First, clear any existing commits
    goGreen.commitsData = [];
    
    // Step 1: Generate 2024 activity (370 commits for the whole year)
    console.log('🚀 Step 1: Completing 2024 with 370 commits...');
    const start2024 = '2024-01-01';
    const end2024 = '2024-12-31';
    
    // Set to light-moderate activity for 2024 to get around 370 commits
    goGreen.randomizer.activityLevel = 'light';
    
    await goGreen.generateCommitsForRange(start2024, end2024, 0, 0, true);
    
    // Calculate 2024 stats
    const commits2024 = goGreen.commitsData.filter(c => moment(c.date).year() === 2024);
    console.log(`✅ 2024 Complete: ${commits2024.length} commits generated\n`);
    
    // Step 2: Generate 2025 activity (300 commits for current year so far)
    console.log('🚀 Step 2: Creating 2025 with 300 commits...');
    const start2025 = '2025-01-01';
    const end2025 = moment().format('YYYY-MM-DD'); // Up to today
    
    // Save 2024 data and reset for 2025
    const commits2024Data = [...goGreen.commitsData];
    goGreen.commitsData = [];
    
    // Set to light activity for 2025 to get around 300 commits
    goGreen.randomizer.activityLevel = 'light';
    
    await goGreen.generateCommitsForRange(start2025, end2025, 0, 0, true);
    
    // Calculate 2025 stats
    const commits2025 = goGreen.commitsData.length;
    console.log(`✅ 2025 Complete: ${commits2025} commits generated\n`);
    
    // Combine both years
    goGreen.commitsData = [...commits2024Data, ...goGreen.commitsData];
    goGreen.saveCommitsData();
    
    // Final stats
    const total2024 = goGreen.commitsData.filter(c => moment(c.date).year() === 2024).length;
    const total2025 = goGreen.commitsData.filter(c => moment(c.date).year() === 2025).length;
    const totalCommits = goGreen.commitsData.length;
    
    console.log('🎉 CUSTOM ACTIVITY CREATED!');
    console.log('============================');
    console.log(`📅 2024: ${total2024} commits (complete year)`);
    console.log(`📅 2025: ${total2025} commits (up to today)`);
    console.log(`📝 Total: ${totalCommits} commits`);
    console.log(`🎯 Target: 370 for 2024, 300 for 2025\n`);
    
    // Show if we're close to targets
    const diff2024 = Math.abs(total2024 - 370);
    const diff2025 = Math.abs(total2025 - 300);
    
    console.log('📊 Target Analysis:');
    console.log(`   2024: ${total2024}/370 (${diff2024 > 20 ? '❌' : '✅'} ${diff2024} difference)`);
    console.log(`   2025: ${total2025}/300 (${diff2025 > 20 ? '❌' : '✅'} ${diff2025} difference)\n`);
    
    console.log('🚀 Ready to push to GitHub!');
    console.log('This gives you perfect activity levels! 🟢');
}

customActivity().catch(console.error);
