const apiKey = 'dNyq6B9J4Ze6acosGTJwdjN4SoYq9WNYBmmKI9ElwrMal6HqZvYpYuFDUmfckNj3';
const apiUrl = 'https://homesphnews-api-394504332858.asia-southeast1.run.app';

async function testNews() {
  try {
    console.log('Fetching news...');
    const response = await fetch(`${apiUrl}/api/external/articles`, {
      headers: {
        'X-Site-Api-Key': apiKey,
        'Accept': 'application/json',
      }
    });

    console.log('Status:', response.status);
    const json = await response.json();
    console.log('Response Structure:', JSON.stringify(json, null, 2).substring(0, 500));
    
    if (json.data && json.data.data) {
      console.log('Articles found:', json.data.data.length);
    } else if (json.data && Array.isArray(json.data)) {
       console.log('Articles found (alt structure):', json.data.length);
    } else {
      console.log('No articles found in expected fields.');
    }
  } catch (error) {
    console.error('Fetch error:', error);
  }
}

testNews();
