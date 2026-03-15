export default async function handler(req, res) {
  try {
    const r = await fetch('https://www.bikeseoul.com/app/station/getStationRealtimeStatus.do', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: 'stationGrpSeq=ALL'
    });
    const data = await r.json();
    const list = data.realtimeList || [];
    // Return compact: { stationId: bikesAvailable }
    const result = {};
    for (const s of list) {
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
