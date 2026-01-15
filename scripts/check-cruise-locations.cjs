const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: process.env.VITE_SANITY_PROJECT_ID || 'f2jf5e8h',
  dataset: process.env.VITE_SANITY_DATASET || 'production',
  useCdn: false,
  apiVersion: '2023-01-01',
  token: process.env.SANITY_TOKEN, // Needed for write operations
});

async function checkCruiseLocations() {
  console.log('=== Checking all boat cruises locations ===\n');

  // Get all locations
  const locations = await client.fetch(`*[_type == "boatTriplocation"]`);
  console.log('Available locations:');
  locations.forEach(loc => {
    console.log(`  - ${loc.id} (${loc.name.fr}) [_id: ${loc._id}]`);
  });
  console.log('');

  // Get all cruises
  const cruises = await client.fetch(`
    *[_type == "boatCruises"] | order(name.fr asc) {
      _id,
      id,
      "nameFr": name.fr,
      "locationRef": location._ref,
      "locationType": location._type
    }
  `);

  console.log('=== All Cruises and their locations ===\n');

  for (const cruise of cruises) {
    // Find the location name
    const location = locations.find(loc => loc._id === cruise.locationRef);
    const locationName = location ? location.id : 'NOT FOUND';

    console.log(`Cruise: "${cruise.nameFr}"`);
    console.log(`  ID: ${cruise.id}`);
    console.log(`  Location: ${locationName}`);
    console.log(`  Location Ref: ${cruise.locationRef}`);
    console.log('');
  }

  // Find suspicious cruises (those with Nouvel An in name but not in Nouvel An location)
  console.log('=== Suspicious cruises (might need location correction) ===\n');

  const nouvelAnLocation = locations.find(loc =>
    loc.id.toLowerCase().includes('nouvel') ||
    loc.id.toLowerCase().includes('new') ||
    loc.id.toLowerCase().includes('ny')
  );

  if (nouvelAnLocation) {
    console.log(`Nouvel An location found: ${nouvelAnLocation.id} [${nouvelAnLocation._id}]\n`);

    const suspiciousCruises = cruises.filter(cruise => {
      const isNouvelAnName = cruise.nameFr.toLowerCase().includes('nouvel an') ||
                             cruise.nameFr.toLowerCase().includes('new year') ||
                             cruise.id.toLowerCase().includes('-ny');
      const isNouvelAnLocation = cruise.locationRef === nouvelAnLocation._id;

      return isNouvelAnName && !isNouvelAnLocation;
    });

    if (suspiciousCruises.length > 0) {
      console.log('⚠️  These cruises have "Nouvel An" in their name but are NOT in Nouvel An location:');
      suspiciousCruises.forEach(cruise => {
        const location = locations.find(loc => loc._id === cruise.locationRef);
        console.log(`  - "${cruise.nameFr}" → Currently in: ${location?.id || 'UNKNOWN'}`);
      });
    } else {
      console.log('✅ All Nouvel An cruises are correctly assigned to Nouvel An location');
    }
  }

  // Also check the reverse: cruises in Nouvel An location that shouldn't be
  console.log('\n=== Cruises in Nouvel An location ===\n');
  if (nouvelAnLocation) {
    const nouvelAnCruises = cruises.filter(cruise => cruise.locationRef === nouvelAnLocation._id);
    console.log(`Found ${nouvelAnCruises.length} cruises in Nouvel An location:`);
    nouvelAnCruises.forEach(cruise => {
      console.log(`  - "${cruise.nameFr}" (${cruise.id})`);
    });
  }

  // Check for common problematic cruises
  console.log('\n=== Checking specific problematic cruises ===\n');
  const problematicNames = ['Yacht Classic 25 places', 'Voilier 12 places'];

  for (const name of problematicNames) {
    const cruise = cruises.find(c => c.nameFr.includes(name));
    if (cruise) {
      const location = locations.find(loc => loc._id === cruise.locationRef);
      console.log(`"${cruise.nameFr}"`);
      console.log(`  Current location: ${location?.id || 'NOT FOUND'}`);
      console.log(`  Expected location: Nouvel An`);
      console.log(`  Status: ${location?.id.toLowerCase().includes('nouvel') ? '✅ Correct' : '❌ INCORRECT'}`);
      console.log('');
    }
  }
}

checkCruiseLocations()
  .then(() => {
    console.log('\n✅ Check complete');
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ Error:', err);
    process.exit(1);
  });
