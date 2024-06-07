// 색상 코드와 해당 한국어 색 이름 매핑
const colorNames = {
    // 빨간 계열
    "ff0000": "시빨간",
    "E4080A": "빨강",
    "D20103": "시뻘건",
    "BF5D83": "불그죽죽",
    "BF736F": "불그스름",
    "800000": "갈",

    // 검정 계열
    "505050": "잿빛 / 까망",
    "808080": "쥐",
    "000000": "검정",

    // 갈색 계열
    "664347": "밤",

    // 노란색 계열
    "e0c75c": "누리끼리",
    "feef5b": "노르스름",
    "fcf698": "노르끄레",
    "d0c105": "누르끄름",
    "ffff00": "노랑",

    // 보라색 계열
    "800080": "보라 / 자주",
    "DBCCF1": "연보라",
    "7F00FF": "남보라",

    // 파란색 계열
    "004898": "아청",
    "000080": "남",
    "40E0D0": "청록",
    "00A6A9": "담청 (전통)",
    "3E91B5": "담청",
    "007FFF": "바다",
    "7CCAD4": "번루",
    "87CEEB": "하늘",
    "0000ff": "파랗",
    "13448D": "퍼렇",
    "172841": "시퍼렁",
    "1A75C2": "새파랑",
    "79C7F9": "파르스름",

    // 초록색 계열
    "7FFF00": "연두",
    "00FF00": "초록",
    "00FF7F": "춘록",

    // 흠
    "FF2400": "다홍",
    "FF4500": "다홍",
    "8182B8": "청회",
    "6699CC": "청회",
    "D6D6D6": "은",
    "FFCCEE": "분홍",
    "FFB400": "귤",
    "ff4500": "주황",

    "008000": "녹",


    "ffffff": "하양"

};

// 드롭다운 메뉴 초기화
const colorDropdown = document.getElementById('colorDropdown');
for (const [hex, name] of Object.entries(colorNames)) {
    const option = document.createElement('option');
    option.value = hex;
    option.textContent = name;
    colorDropdown.appendChild(option);
}

// 선택한 색상에 가장 가까운 색상을 찾는 함수
function getClosestColor(hex) {
    let minDistance = Infinity;
    let closestColor = "";

    for (const [key, value] of Object.entries(colorNames)) {
        const distance = getColorDistance(hex, key);
        if (distance < minDistance) {
            minDistance = distance;
            closestColor = value;
        }
    }

    return closestColor;
}

// 두 색상 간의 거리 계산 함수
function getColorDistance(hex1, hex2) {
    const r1 = parseInt(hex1.slice(0, 2), 16);
    const g1 = parseInt(hex1.slice(2, 4), 16);
    const b1 = parseInt(hex1.slice(4, 6), 16);

    const r2 = parseInt(hex2.slice(0, 2), 16);
    const g2 = parseInt(hex2.slice(2, 4), 16);
    const b2 = parseInt(hex2.slice(4, 6), 16);

    return Math.sqrt(
        (r2 - r1) ** 2 +
        (g2 - g1) ** 2 +
        (b2 - b1) ** 2
    );
}

// 드롭다운 메뉴 선택 이벤트 핸들러
colorDropdown.addEventListener('change', (event) => {
    const selectedHex = event.target.value;
    if (selectedHex) {
        document.getElementById('colorPicker').value = `#${selectedHex}`;
        const colorName = colorNames[selectedHex];
        document.getElementById('colorName').textContent = colorName;
    } else {
        document.getElementById('colorName').textContent = "색상을 선택하세요";
    }
});

// 색상 선택기 이벤트 핸들러
document.getElementById('colorPicker').addEventListener('input', (event) => {
    const hex = event.target.value.substring(1); // #을 제거
    const colorName = getClosestColor(hex);
    document.getElementById('colorName').textContent = colorName;
});