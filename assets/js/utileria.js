function s2ab(s) {
    var buf = new ArrayBuffer(s.length);
    var view = new Uint8Array(buf);
    for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
    return buf;
}
function getColWidths(data) {
    var colWidths = [];
    var headers = Object.keys(data[0]);
    for (var i = 0; i < headers.length; i++) {
        var maxLength = headers[i].length;
        for (var j = 0; j < data.length; j++) {
            var value = data[j][headers[i]];
            if (value !== null && value !== undefined) {
                var cellLength = value.toString().length;
                if (cellLength > maxLength) {
                    maxLength = cellLength;
                }
            }
        }
        colWidths.push({ wch: maxLength + 1 });
    }
    return colWidths;
}