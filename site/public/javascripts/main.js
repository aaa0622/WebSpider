UIkit.datepicker(document.getElementById('depDate') , {weekstart: 0 , minDate: 0 , format: 'YYYY-MM-DD'});
UIkit.datepicker(document.getElementById('retDate') , {weekstart: 0 , minDate: 0 , format: 'YYYY-MM-DD'});

var showMessage = function showMessage(message){
  var msg = (typeof message === 'string'? message : String(message));
  $('#message').text(msg);
}

var validation = function validation(data){
  if(!(data.des === 'KIX') && !(data.des === 'NRT')){
    showMessage('您忘記輸入目的地');
  }else if(!data.depDate || !data.retDate){
    showMessage('錯誤的日期');
  }else if((new Date(data.depDate) - new Date()) < 0){
    showMessage('請選擇今天以後的日期');
  }else if((new Date(data.retDate) - new Date(data.depDate)) < 0){
    showMessage('回國日期要在出國日期之後才對喔');
  }else{
    showMessage('搜尋中...');
    $('#enter').attr('disabled' , true);
    $.post('/search', data).success(function(data){
      showMessage('Message');
      $('#enter').attr('disabled' , false);
      render(data);
    }).error(function(){
      showMessage('Error ! Please try again.');
      $('#enter').attr('disabled' , false);
    });
  }
};

var render = function render(data){
  var source = '';
  _.each(data, function(price , flight) {
    var tr = "<tr><td>"+ flight +"</td>";
    tr+= "<td><span>" + price['DeparturePrice'] + "</span></td>";
    tr+= "<td><span>" + price['ReturnPrice'] + "<span></td></tr>";
    source += tr;
  });

  $("#SearchResult").html(source);
}




$('#enter').on('click', function(event) {
  event.preventDefault();
  var data = {
    des: $("#des").val(),
    depDate: $("#depDate").val(),
    retDate: $("#retDate").val()
  };
  validation(data);

});
