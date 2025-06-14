const GoGreen = require('./goGreen');
const moment = require('moment');

async function runRealisticExamples() {
    const goGreen = new GoGreen();
    
    // Initialize repository
    await goGreen.initializeRepo();
    
    console.log('🎯 Welcome to goGreen - Realistic Developer Activity Generator!');
    console.log('==============================================================');
    console.log('These examples use realistic patterns that mimic real developer behavior:\n');
    
    // Example 1: Realistic last 3 months
    console.log('Example 1: Realistic activity for last 3 months');
    const realisticLast3Months = async () => {
        const endDate = moment().format('YYYY-MM-DD');
        const startDate = moment().subtract(3, 'months').format('YYYY-MM-DD');
        
        console.log(`📊 Generating realistic activity from ${startDate} to ${endDate}`);
        console.log('🔍 This will include:');
        console.log('   - Less activity on weekends');
        console.log('   - Realistic commit times (work hours)');
        console.log('   - Proper commit message types (feat, fix, docs, etc.)');
        console.log('   - Some days with no commits (realistic!)');
        console.log('   - Occasional high-activity days (crunch time)');
        
        await goGreen.generateCommitsForRange(startDate, endDate, 0, 0, true);
        goGreen.saveCommitsData();
    };
    
    // Example 2: Simulate a project development cycle
    console.log('\nExample 2: Project development cycle (6 months)');
    const projectCycle = async () => {
        const phases = [
            { name: 'Planning Phase', weeks: 2, activity: 'low' },
            { name: 'Initial Development', weeks: 8, activity: 'high' },
            { name: 'Testing Phase', weeks: 3, activity: 'medium' },
            { name: 'Bug Fixes', weeks: 2, activity: 'high' },
            { name: 'Maintenance', weeks: 9, activity: 'low' }
        ];
        
        let currentDate = moment().subtract(6, 'months');
        
        for (const phase of phases) {
            console.log(`\n🚀 ${phase.name} (${phase.weeks} weeks, ${phase.activity} activity)`);
            const phaseEnd = currentDate.clone().add(phase.weeks, 'weeks');
            
            await goGreen.generateCommitsForRange(
                currentDate.format('YYYY-MM-DD'),
                phaseEnd.format('YYYY-MM-DD'),
                0, 0, true
            );
            
            currentDate = phaseEnd.clone();
        }
        
        goGreen.saveCommitsData();
    };
    
    // Example 3: Simulate learning a new technology
    console.log('\nExample 3: Learning curve simulation');
    const learningCurve = async () => {
        console.log('📚 Simulating learning a new technology over 2 months:');
        console.log('   - Week 1-2: Heavy learning (many small commits)');
        console.log('   - Week 3-4: Building confidence (medium activity)');
        console.log('   - Week 5-8: Productive development (consistent activity)');
        
        const startDate = moment().subtract(2, 'months');
        const endDate = moment();
        
        await goGreen.generateCommitsForRange(
            startDate.format('YYYY-MM-DD'),
            endDate.format('YYYY-MM-DD'),
            0, 0, true
        );
        
        goGreen.saveCommitsData();
    };
    
    // Example 4: Realistic yearly activity
    console.log('\nExample 4: Full year realistic activity');
    const yearlyActivity = async () => {
        const endDate = moment().format('YYYY-MM-DD');
        const startDate = moment().subtract(1, 'year').format('YYYY-MM-DD');
        
        console.log(`📅 Generating realistic yearly activity from ${startDate} to ${endDate}`);
        console.log('🎯 This includes:');
        console.log('   - Holiday periods with reduced activity');
        console.log('   - Vacation gaps (some weeks with no commits)');
        console.log('   - Seasonal patterns');
        console.log('   - Weekend vs weekday differences');
        
        await goGreen.generateCommitsForRange(startDate, endDate, 0, 0, true);
        goGreen.saveCommitsData();
    };
    
    // Example 5: Sprint-based development (Agile)
    console.log('\nExample 5: Agile sprint simulation');
    const sprintDevelopment = async () => {
        console.log('🏃‍♂️ Simulating 6 two-week sprints:');
        
        let sprintStart = moment().subtract(12, 'weeks');
        
        for (let sprint = 1; sprint <= 6; sprint++) {
            const sprintEnd = sprintStart.clone().add(2, 'weeks');
            
            console.log(`\n🎯 Sprint ${sprint}: ${sprintStart.format('MMM DD')} - ${sprintEnd.format('MMM DD')}`);
            
            // Sprint pattern: slow start, heavy middle, testing end
            await goGreen.generateCommitsForRange(
                sprintStart.format('YYYY-MM-DD'),
                sprintEnd.format('YYYY-MM-DD'),
                0, 0, true
            );
            
            sprintStart = sprintEnd.clone();
        }
        
        goGreen.saveCommitsData();
    };
    
    console.log('\n💡 Choose which example to run by uncommenting it below:');
    console.log('⚠️  Remember: This creates real commits in your repository!');
    console.log('📝 Each example uses realistic developer patterns.\n');
    
    // Uncomment ONE of these examples to run:
    
    // await realisticLast3Months();
    // await projectCycle();
    // await learningCurve();
    // await yearlyActivity();
    // await sprintDevelopment();
    
    console.log('🔧 Edit this file to uncomment the example you want to run!');
}

// Run realistic examples
runRealisticExamples().catch(console.error);
