
function checksum(n) {
    return n.replaceAll('<', '0')
      .split('')
      .map((e,i) => "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(e) * [7, 3, 1][i  % 3])
      .reduce((s, e) => s + e, 0) % 10
}

function checksum_full(n) {
    let clean = n.replaceAll(/^.*?<</g,'')
             .replaceAll(/(<<<[0-9]{7})<([0-9]{7})D<</g, '$1$2');
    return checksum(clean);
}

function sample(a, n) {
    let result = [];
    for (let i = 0; i < n; i++) {
        let k = Math.floor(Math.random() * a.length);
        result.push(a[k]);
    }

    return result.join("");
}

function date_to_string(d) {
    return d.getFullYear().toString().substring(2,4)
                 + (d.getMonth() + 1).toString().padStart(2, '0')
                 + d.getDate().toString().padStart(2, '0');
}

function generate(age) {
    let number = "L"
    number += sample("1234567890CFGHJKLMNPRTVWXYZ".split(''), 8)

    number += checksum(number)
    number = "IDD<<" + number
    number = number.padEnd(30,'<')

    let d = new Date(Date.now() - 24 * 365 * age * 1000 * 60 * 60
                              - Math.random() * 24 * 365 * 1000 * 60 * 60);

    let birthday = date_to_string(d);

    birthday += checksum(birthday)

    number += birthday
    number += '<'

    d = new Date(Date.now() + 24 * 365 * 6 * 1000 * 60 * 60
                              - Math.random() * 24 * 365 * 1000 * 60 * 60);

    let expiry = date_to_string(d);

    expiry += checksum(expiry)

    number += expiry
    number += 'D<<2108'
    number = number.padEnd(59, '<')

    number += checksum_full(number)

    return number;
}

function generate_html(age) {
    let number = generate(age);
    number = number.substring(0, 30) + "&nbsp;&nbsp;|||" + number.substring(30, 60);
    return number.replaceAll(/</g, '&lt;').replaceAll('|||', '<br>');
}

function generate_random() {
   return generate_html(21 + Math.random() * 20);
}
