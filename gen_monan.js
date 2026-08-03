const fs = require('fs');

const canhTypes = [
  'Canh chua', 'Canh bí đỏ', 'Canh mướp', 'Canh cải ngọt', 'Canh khổ qua nhồi',
  'Canh rong biển', 'Canh nấm', 'Canh cua đồng', 'Canh ngao', 'Canh su su', 'Canh chua dứa'
];
const canhProteins = [
  'cá lóc', 'cá diêu hồng', 'cá thu', 'tôm', 'mực', 'cua', 'sườn heo', 'gà', 'rau muống', 'bầu', 'cải bẹ'
];

const thitStyles = [
  'xào sả ớt', 'kho tộ', 'nướng mật ong', 'chiên nước mắm', 'ráng trứng', 'hấp sả',
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

function uniqueNames(arr) {
  return Array.from(new Set(arr)).filter(Boolean);
}

function makeDish(name, category) {
  const commonIngredients = {
    canh: 'nước dùng, rau thơm, gia vị, nước mắm, tiêu',
    thit: 'gia vị, dầu ăn, hành, tỏi, tiêu, nước mắm',
    rau: 'dầu ăn, tỏi, muối, tiêu, xì dầu'
  };
  const methodNotes = {
    canh: 'Nấu nước dùng, cho nguyên liệu vào, nêm vừa ăn và thêm rau thơm trước khi tắt bếp.',
    thit: 'Ướp gia vị, làm nóng chảo, chế biến đến khi chín và thấm đều gia vị.',
    rau: 'Phi thơm tỏi, xào rau nhanh tay trên lửa lớn để giữ độ giòn và màu xanh đẹp.'
  };

  return {
    ten: name,
    cachnau: `<strong>📋 Nguyên liệu:</strong> ${name}, ${commonIngredients[category]}.<br><br><strong>👨‍🍳 Cách nấu:</strong> ${methodNotes[category]}`
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
  ...buildList(thitStyles, thitProteins, 160),
  'Gà chiên nước mắm', 'Gà rang muối', 'Thịt kho trứng', 'Thịt ba chỉ nướng',
  'Sườn non rang cháy cạnh', 'Bò lúc lắc', 'Tôm rim nước dừa', 'Mực xào sa tế',
  'Cá kho tộ', 'Cá nướng giấy bạc', 'Bò sốt vang', 'Thịt bò xào lăn', 'Gà nướng mật ong',
  'Thịt heo quay giòn bì', 'Cá chiên giòn', 'Thịt bò sốt tiêu đen'
]).slice(0, 160);

const rauNames = uniqueNames([
  ...buildList(rauStyles, rauTypes, 70),
  'Rau muống xào tỏi ớt', 'Bắp cải cuộn thịt chay', 'Salad cà chua dưa leo',
  'Đậu bắp luộc chấm mắm', 'Măng tây xào nấm', 'Cải ngọt xào tỏi',
  'Rau xào sa tế', 'Rau củ hấp nước tương', 'Nấm xào bơ hành', 'Su su xào tỏi'
]).slice(0, 70);

const canh = canhNames.map(name => makeDish(name, 'canh'));
const thit = thitNames.map(name => makeDish(name, 'thit'));
const rau = rauNames.map(name => makeDish(name, 'rau'));

const data = { canh, thit, rau };
fs.writeFileSync('monan.json', JSON.stringify(data, null, 2) + '\n');
console.log('Created monan.json with', canh.length, 'canh,', thit.length, 'thit,', rau.length, 'rau.');
