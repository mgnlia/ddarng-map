const API_KEY = '5567574c5161756438336678547863';

async function fetchBatch(start, end) {
  const url = `http://openapi.seoul.go.kr:8088/${API_KEY}/json/bikeList/${start}/${end}/`;
  const r = await fetch(url);
  const text = await r.text();
  const data = JSON.parse(text);
  return data.rentBikeStatus?.row || [];
}

export default async function handler(req, res) {
  try {
    // Fetch all stations in batches of 1000
    const [b1, b2, b3] = await Promise.all([
      fetchBatch(1, 1000),
      fetchBatch(1001, 2000),
      fetchBatch(2001, 3000)
    ]);
    const all = [...b1, ...b2, ...b3];

    const result = {};
    for (const s of all) {
      if (s.stationName && s.stationName.includes('새싹')) continue;
      result[s.stationName] = {
        bikes: parseInt(s.parkingBikeTotCnt || '0'),
        racks: parseInt(s.rackTotCnt || '0')
      };
    }
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=120');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json(result);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
