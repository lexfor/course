let lastDate;
function getCurrency(){
    $.getJSON('https://www.nbrb.by/API/ExRates/Rates',{'Periodicity': 0 })
        .done(function (data) {
            console.log(1);
            $.each(data, function (key, item) {
                $('<li>', { text: JSON.stringify(item.Cur_Scale) + '\t' +
                                  JSON.stringify(item.Cur_Abbreviation) + '\t' + '(' +
                                  JSON.stringify(item.Cur_Name) + ')' + '\t : \t' +
                                  JSON.stringify(item.Cur_OfficialRate) + '\t' +
                                  'BYN'})
                            .appendTo($('#currencies'));
            });
        }).error(function (err) {
        alert('ошибка');
    });
}
function checkDate() { // Курс НБРБ меняется раз в день.
    let newDate = new Date;
    if (newDate.getDay() !== lastDate.getDay()) {
        getCurrency();
    }
}
$(function () {
    lastDate = new Date;
    getCurrency();
    setInterval(() =>{
        checkDate();
    }, 3000);
});