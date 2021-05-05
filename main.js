const { parse } = require('json2csv');

let text = ``;

var str = text;
const unique = [];
const repetitions = [];


for (let line of str.split('\n')) {

    const match = line.match(/\d{5}/g);

    if (match) {
        if (!unique.find(student => student.rollNo === match[0])) {
            unique.push({
                rollNo: match[0],
                name: line.split(':')[0],
            });
        } else {
            repetitions.push(
                {
                    rollNo: match[0],
                    name: line.split(':')[0],
                }
            );
        }
    }
}

function sortByKey(array, key) {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}

function getDateString() {
    const date = new Date();
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, '0');
    const day =`${date.getDate()}`.padStart(2, '0');
    return `${year}${month}${day}`
}

const fields = ['rollNo', 'name'];
const opts = { fields };

try {
  const csv = parse(unique, opts);
    // write to a new file named 2pac.txt
    require('fs').writeFile(`attendance_${getDateString()}.csv`, csv, (err) => {
        // throws an error, you could also catch it here
        if (err) throw err;

        // success case, the file was saved
        console.log('attendance saved!');
    });
} catch (err) {
  console.error(err);
}


