const fs = require('fs');

const canhTypes = [
  'Canh chua', 'Canh bí đỏ', 'Canh mướp', 'Canh cải ngọt', 'Canh khổ qua nhồi',
  'Canh rong biển', 'Canh nấm', 'Canh cua đồng', 'Canh ngao', 'Canh su su', 'Canh chua dứa'
];
const canhProteins = [
  'cá lóc', 'cá diêu hồng', 'cá thu', 'tôm', 'mực', 'cua', 'sườn heo', 'gà', 'rau muống', 'bầu', 'cải bẹ'
];

const thitStyles = [
  'xào sả ớt', 'kho tộ', 'nướng mật ong', 'chiên nước mắm', 'rán trứng', 'hấp sả',
  'ram mặn', 'xào rau củ', 'sốt tiêu đen', 'xào mì', 'sốt chua ngọt', 'nướng sa tế',
  'nấu cà ri', 'hấp bia', 'kho gừng', 'kho tiêu', 'rán giòn', 'kho tàu', 'xào nấm', 'kho hành',
  'xào hành tây', 'nướng lá chanh', 'xào me', 'nướng mật ong', 'kho tỏi', 'nướng muối ớt'
];
const thitProteins = [
  'gà', 'bò', 'heo', 'cá thu', 'cá lóc', 'tôm', 'mực', 'thịt bò', 'thịt gà', 'thịt heo',
  'xúc xích', 'giăm bông', 'thịt nạc dăm', 'sườn non', 'ba chỉ', 'bò viên', 'thịt băm', 'bạch tuộc', 'thịt ba chỉ', 'cá hồi'
];

const rauTypes = [
  'Rau muống', 'Bắp cải', 'Cải thìa', 'Cải ngọt', 'Cải bó xôi', 'Măng tây',
  'Cà rốt', 'Bắp non', 'Cải ngồng', 'Cải trắng', 'Đậu que', 'Đậu bắp', 'Su su', 'Mộc nhĩ',
  'Nấm kim châm', 'Cải xanh', 'Cải chíp', 'Rau dền', 'Rau bí', 'Dưa chuột', 'Cà chua',
  'Rau xà lách', 'Cải thảo', 'Ngó sen', 'Mướp', 'Bí đỏ', 'Rau củ', 'Bông cải', 'Khoai lang',
  'Đậu hũ', 'Rau má'
];
const rauStyles = [
  'xào tỏi', 'luộc chấm mắm', 'trộn dầu giấm', 'nấu canh chua', 'xào nấm', 'hấp hẹ',
  'xào bơ', 'nướng muối ớt', 'gỏi', 'đậu hũ kho', 'salad', 'xào sả ớt', 'nước chấm mắm tỏi',
  'xào nấm mèo', 'nấu canh ngọt', 'trộn me', 'xào tương', 'xào rau củ', 'dưa chua', 'đậu hũ chiên'
];
const rauHapNames = [
  'Bí đỏ hấp hành', 'Cà rốt hấp', 'Khoai lang hấp', 'Đậu bắp hấp', 'Su su hấp',
  'Mướp trắng hấp', 'Bầu hấp', 'Rau dền hấp', 'Củ đậu hấp', 'Măng tây hấp',
  'Rau muống hấp', 'Củ quả hấp', 'Sắn hấp mỡ hành', 'Cải thìa hấp'
];
const rusticDishNames = [
  'Bánh ít trần', 'Bánh đúc nóng', 'Bánh giò', 'Bánh căn', 'Bánh xèo', 'Nem nướng',
  'Chả giò', 'Đậu hũ nhồi thịt', 'Bột lọc chiên giòn', 'Bánh cuốn nóng', 'Bánh bột lọc'
];

function uniqueNames(arr) {
  return Array.from(new Set(arr)).filter(Boolean);
}

function findMainIngredient(name, category) {
  const lower = name.toLowerCase();
  const matched = [
    ...canhProteins.filter(item => lower.includes(item)),
    ...thitProteins.filter(item => lower.includes(item))
  ];

  if (matched.length > 0) return matched[0];
  if (lower.includes('gà')) return 'thịt gà';
  if (lower.includes('bò')) return 'thịt bò';
  if (lower.includes('heo')) return 'thịt heo';
  if (lower.includes('cá')) return 'cá';
  if (lower.includes('tôm')) return 'tôm';
  if (lower.includes('mực')) return 'mực';
  if (lower.includes('cua')) return 'cua';
  if (lower.includes('rau')) return 'rau';
  if (lower.includes('cải')) return 'cải';
  if (lower.includes('bí')) return 'bí';
  if (lower.includes('mướp')) return 'mướp';
  if (lower.includes('đậu')) return 'đậu';

  return category === 'canh' ? 'nguyên liệu chính' : category === 'thit' ? 'thịt' : 'rau';
}

function inferCookingStyle(name) {
  const normalizedName = name.replace(/ráng/gi, 'rán').replace(/ráng/gi, 'rán');
  const lower = normalizedName.toLowerCase();
  if (/(xào|xao)/.test(lower)) return 'xào';
  if (/(trộn|tron|gỏi|goi|salad)/.test(lower)) return 'trộn';
  if (/(luộc|luoc)/.test(lower)) return 'luộc';
  if (/(ram|rim)/.test(lower)) return 'ram';
  if (/(kho|kho tộ|kho tàu)/.test(lower)) return 'kho';
  if (/(rán|ran|ráng|rang|chiên|chien)/.test(lower)) return 'rán';
  if (/(nướng|nuong)/.test(lower)) return 'nướng';
  if (/(hấp|hap)/.test(lower)) return 'hấp';
  if (/(canh|súp|sup)/.test(lower)) return 'nấu canh';
  return 'chế biến';
}

function getIngredientList(category, style, mainIngredient) {
  const baseCanh = [
    '1 lít nước dùng hoặc nước sôi',
    '1 nắm hành lá và rau thơm',
    '2–3 muỗng canh nước mắm',
    '1 ít muối, tiêu và đường'
  ];
  const baseThit = [
    '2–3 tép tỏi, 1 củ hành',
    '2 muỗng canh dầu ăn',
    '2–3 muỗng canh nước mắm hoặc xì dầu',
    '1 ít tiêu, đường và ớt'
  ];
  const baseRau = [
    '2–3 tép tỏi',
    '1 muỗng canh dầu ăn',
    '1 ít muối và tiêu',
    '1–2 muỗng canh nước mắm hoặc xì dầu'
  ];

  switch (style) {
    case 'trộn':
      return [
        `250–300g ${mainIngredient}`,
        '1–2 muỗng canh dầu giấm',
        '1 ít hành phi và rau thơm',
        '1 ít đường và tiêu'
      ];
    case 'luộc':
      return [
        `300–400g ${mainIngredient}`,
        '1 ít muối',
        '1 nắm rau thơm và hành',
        '1 chén nước chấm mắm tỏi'
      ];
    case 'ram':
      return [
        `300–400g ${mainIngredient}`,
        '2 muỗng canh nước mắm',
        '1 ít đường và tỏi',
        '1 ít ớt và hành'
      ];
    case 'kho':
      return [
        `300–400g ${mainIngredient}`,
        '2–3 muỗng canh nước mắm',
        '1 ít đường và tiêu',
        '1 nắm hành lá'
      ];
    case 'rán':
      return [
        `250–300g ${mainIngredient}`,
        '2–3 muỗng canh bột chiên hoặc bột mì',
        '1 ít muối và tiêu',
        '1 lít dầu ăn'
      ];
    case 'nướng':
      return [
        `300–400g ${mainIngredient}`,
        '2 muỗng canh nước mắm',
        '1 ít sả, tỏi và ớt',
        '1 ít dầu ăn'
      ];
    case 'hấp':
      return [
        `250–300g ${mainIngredient}`,
        '1 ít gừng và hành',
        '1 muỗng canh nước mắm',
        '1 ít tiêu'
      ];
    case 'xào':
      return [
        category === 'canh' ? `200–300g ${mainIngredient}` : `250–300g ${mainIngredient}`,
        '2–3 tép tỏi',
        '1 muỗng canh dầu ăn',
        '1 ít muối và tiêu'
      ];
    default:
      return category === 'canh'
        ? [`200–300g ${mainIngredient}`, ...baseCanh]
        : category === 'thit'
          ? [`300–400g ${mainIngredient}`, ...baseThit]
          : [`250–300g ${mainIngredient}`, ...baseRau];
  }
}

function getStepList(category, style) {
  switch (style) {
    case 'trộn':
      return [
        'Pha nước trộn bằng dầu giấm, đường và tiêu cho vừa miệng.',
        'Cho nguyên liệu chính vào tô, rưỡi đều và thêm hành phi, rau thơm.',
        'Trộn nhanh tay và thưởng thức ngay khi còn tươi.'
      ];
    case 'luộc':
      return [
        'Đun nước sôi với một ít muối rồi cho nguyên liệu vào luộc chín vừa tới.',
        'Vớt ra, cho vào đĩa và ăn kèm với nước chấm mắm tỏi.',
        'Rắc hành lá và rau thơm lên trên trước khi thưởng thức.'
      ];
    case 'ram':
      return [
        'Ướp nguyên liệu với nước mắm, đường và tỏi trong 10 phút.',
        'Cho vào nồi nhỏ lửa và rim cho đến khi thấm và hơi sánh.',
        'Tắt bếp khi nước sốt quyện đều và thơm.'
      ];
    case 'kho':
      return [
        'Ướp nguyên liệu với nước mắm, đường và tiêu trước.',
        'Cho vào nồi cùng một ít nước và kho nhỏ lửa cho thấm.',
        'Thêm hành lá ở cuối rồi đun thêm vài phút cho sánh.'
      ];
    case 'rán':
      return [
        'Cuộn hoặc lăn nguyên liệu qua bột trước khi chiên.',
        'Đun nóng dầu rồi cho vào chiên vàng đều cả hai mặt.',
        'Vớt ra để ráo dầu và thưởng thức nóng.'
      ];
    case 'nướng':
      return [
        'Ướp nguyên liệu với nước mắm, tỏi, sả và ớt trong 15 phút.',
        'Nướng trên bếp hoặc lò đến khi chín thơm và có mùi khói.',
        'Phủ thêm ít dầu ăn hoặc hành lá trước khi dùng.'
      ];
    case 'hấp':
      return [
        'Chuẩn bị nguyên liệu và đặt vào xửng hấp.',
        'Hấp cho đến khi chín mềm và giữ được vị ngọt tự nhiên.',
        'Rắc hành, tiêu và nước mắm lên trên rồi dùng nóng.'
      ];
    case 'xào':
      return [
        'Phi thơm tỏi với dầu ăn trên lửa vừa.',
        'Cho nguyên liệu chính vào xào nhanh tay cho chín tới.',
        'Nêm muối, tiêu và nước mắm vừa ăn rồi tắt bếp.'
      ];
    default:
      return category === 'canh'
        ? [
            'Đun sôi nước dùng rồi cho nguyên liệu chính vào nấu chín vừa tới.',
            'Cho hành, tỏi và các loại rau thơm vào cuối để giữ hương vị tươi.',
            'Nêm lại bằng nước mắm, muối, tiêu và đường cho vừa miệng.',
            'Tắt bếp khi nước canh đã trong và nguyên liệu chín mềm.'
          ]
        : category === 'thit'
          ? [
              'Ướp thịt với tỏi, hành, nước mắm, tiêu và một chút đường trong 10–15 phút.',
              'Đun nóng chảo với dầu rồi cho thịt vào chế biến cho thấm gia vị.',
              'Nếu món có ớt, sả hoặc hành tây thì cho vào ở giai đoạn giữa để tăng hương thơm.',
              'Nấu cho đến khi chín mềm và thưởng thức nóng.'
            ]
          : [
              'Phi thơm tỏi với dầu ăn trên lửa vừa rồi cho rau vào xào nhanh.',
              'Đảo đều để rau chín tới nhưng vẫn giữ được độ giòn và màu xanh.',
              'Nêm muối, tiêu và nước mắm hoặc xì dầu cho vừa ăn.',
              'Tắt bếp ngay khi rau đã chín, tránh làm mềm quá.'
            ];
  }
}

function getTip(style, lower) {
  if (lower.includes('chua')) {
    return 'Để món chua đậm đà hơn, thêm một chút me hoặc cà chua và nấu lửa nhỏ thêm 5 phút.';
  }
  if (style === 'trộn') {
    return 'Trộn trước khi ăn để giữ được độ tươi và không bị nhão.';
  }
  if (style === 'luộc') {
    return 'Luộc ngắn vừa đủ để nguyên liệu vẫn giữ được độ ngọt tự nhiên.';
  }
  if (style === 'ram') {
    return 'Nấu lửa nhỏ để nước sốt sánh và nguyên liệu thấm đều.';
  }
  if (style === 'kho') {
    return 'Kho lửa nhỏ để thịt hoặc cá thấm gia vị mà không bị khô.';
  }
  if (style === 'rán') {
    return 'Để dầu đủ nóng trước khi cho nguyên liệu vào để món giòn hơn.';
  }
  if (style === 'nướng') {
    return 'Ướp lâu hơn 10 phút sẽ giúp món thơm và thấm gia vị hơn.';
  }
  if (style === 'hấp') {
    return 'Không hấp quá lâu để món không bị khô và mất độ ngọt.';
  }
  if (style === 'xào') {
    return 'Xào trên lửa lớn và đảo liên tục để giữ độ giòn.';
  }
  return 'Nêm nếm lại trước khi tắt bếp vì hương vị sẽ thay đổi khi nóng dần.';
}

function buildRecipeHtml(name, category) {
  const mainIngredient = findMainIngredient(name, category);
  const style = inferCookingStyle(name);
  const lower = name.toLowerCase();
  const nguyenLieu = getIngredientList(category, style, mainIngredient);
  const cachNau = getStepList(category, style);
  const meo = getTip(style, lower);

  const ingredientHtml = nguyenLieu.map(item => `<li>${item}</li>`).join('');
  const stepHtml = cachNau.map((step, index) => `<li>Bước ${index + 1}: ${step}</li>`).join('');

  return {
    phuongThuc: style,
    nguyenLieu,
    cachNau,
    meo,
    cachnau: `<strong>🍳 Cách nấu:</strong> ${style.charAt(0).toUpperCase() + style.slice(1)}<br><strong>📋 Nguyên liệu:</strong><ul>${ingredientHtml}</ul><br><strong>👨‍🍳 Các bước:</strong><ol>${stepHtml}</ol><br><strong>💡 Mẹo nhỏ:</strong> ${meo}`
  };
}

function makeDish(name, category) {
  const recipe = buildRecipeHtml(name, category);
  return {
    ten: name,
    ...recipe
  };
}

function buildList(prefixes, items, count) {
  const names = [];
  for (const prefix of prefixes) {
    for (const item of items) {
      names.push(`${prefix} ${item}`);
      if (names.length >= count) return uniqueNames(names);
    }
  }
  return uniqueNames(names).slice(0, count);
}

const canhNames = uniqueNames([
  ...buildList(canhTypes, canhProteins, 80),
  'Canh chua cá trê', 'Canh chua hải sản', 'Canh mướp nấu tôm', 'Canh bí xanh nấu tôm',
  'Canh cải ngọt nấu sườn', 'Canh khổ qua nhồi tôm', 'Canh chua lươn', 'Canh riêu cua đồng',
  'Canh chua nấm', 'Canh chua sườn' 
]).slice(0, 80);

const thitNames = uniqueNames([
  ...rusticDishNames,
  ...buildList(thitStyles, thitProteins, 180),
  'Gà chiên nước mắm', 'Gà rang muối', 'Thịt kho trứng', 'Thịt ba chỉ nướng',
  'Sườn non rang cháy cạnh', 'Bò lúc lắc', 'Tôm rim nước dừa', 'Mực xào sa tế',
  'Cá kho tộ', 'Cá nướng giấy bạc', 'Bò sốt vang', 'Thịt bò xào lăn', 'Gà nướng mật ong',
  'Thịt heo quay giòn bì', 'Cá chiên giòn', 'Thịt bò sốt tiêu đen'
]).slice(0, 220);

const rauNames = uniqueNames([
  ...rauHapNames,
  ...buildList(rauStyles, rauTypes, 80),
  'Rau muống xào tỏi ớt', 'Bắp cải cuộn thịt chay', 'Salad cà chua dưa leo',
  'Đậu bắp luộc chấm mắm', 'Măng tây xào nấm', 'Cải ngọt xào tỏi',
  'Rau xào sa tế', 'Rau củ hấp nước tương', 'Nấm xào bơ hành', 'Su su xào tỏi'
]).slice(0, 120);

const canh = canhNames.map(name => makeDish(name, 'canh'));
const thit = thitNames.map(name => makeDish(name, 'thit'));
const rau = rauNames.map(name => makeDish(name, 'rau'));

const data = { canh, thit, rau };
fs.mkdirSync('data', { recursive: true });
fs.writeFileSync('data/canh.json', JSON.stringify(canh, null, 2) + '\n');
fs.writeFileSync('data/thit.json', JSON.stringify(thit, null, 2) + '\n');
fs.writeFileSync('data/rau.json', JSON.stringify(rau, null, 2) + '\n');
fs.writeFileSync('monan.json', JSON.stringify(data, null, 2) + '\n');
console.log('Created data/canh.json, data/thit.json, data/rau.json and monan.json with', canh.length, 'canh,', thit.length, 'thit,', rau.length, 'rau.');
