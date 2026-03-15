# 🚲 서울 고도 지도 × 따릉이

서울시 고도(elevation) 위에 따릉이(공공자전거) 대여소를 오버레이한 인터랙티브 지도.

## Features

- 🏔 서울 지형(terrain) 타일 레이어
- 🚲 따릉이 대여소 2,700+ 개 실시간 로딩
- 🎨 대여소별 고도에 따른 색상 코딩 (Open-Meteo Elevation API)
- 🔥 고도 히트맵 캔버스 레이어
- 📱 반응형 (모바일 지원)

## 고도 색상

| 색상 | 고도 |
|------|------|
| 🟦 남색 | 0–20m |
| 🔵 파랑 | 20–40m |
| 🟩 초록 | 40–80m |
| 🟨 노랑 | 80–150m |
| 🟧 주황 | 150–300m |
| 🟥 빨강 | 300m+ |

## 실행

그냥 `index.html`을 브라우저에서 열면 됨. 서버 불필요 (CORS-free API 사용).

```bash
open index.html
# 또는
python3 -m http.server 8080
```

## 데이터 소스

- **따릉이**: [서울자전거 실시간 API](https://www.bikeseoul.com)
- **고도**: [Open-Meteo Elevation API](https://open-meteo.com/)
- **지도 타일**: CartoDB Dark + Stamen Terrain (Stadia Maps)

## License

MIT
