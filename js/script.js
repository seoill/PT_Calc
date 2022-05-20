
(function($){

    var txt = $('#resultTxt');
    var totalPtPrice = '';
    var totalPtNum = '';
    var onePtPrice = '';
    var nowPtNum = '';
    //입력값 넣어주기
    $('#totalPtPrice').on({
      keyup:function(){
        totalPtPrice = $(this).val();
        },
        focusout:function(){
        var guid = $(this).siblings('.guid');
        var regex = /^[\d]{6,8}$/g;
        if(regex.test($(this).val())){
          guid.removeClass('on'); 
          return
        }
        if(!regex.test($(this).val())){
          guid.addClass('on');
        }
        }
    });
    $('#totalPtNum').on({
      keyup:function(){
        totalPtNum = $(this).val();
      }
    });
    $('#nowPtNum').on({
      keyup:function(){
        nowPtNum = $(this).val();
      },
      focusout:function(){
        var guid = $(this).siblings('.guid');
        if(totalPtNum<nowPtNum){
          guid.addClass('on'); 
          return;
        }
        else{
          guid.removeClass('on');
        }
      }
    });
    
    //계산기 수식
    function calc1(){
      onePtPrice = totalPtPrice/totalPtNum;
      var result1 = onePtPrice*nowPtNum; // 10%를 빼지 않은 환불받을 금액
      var result2 = totalPtPrice*0.1; // 전체금액의 10%
      var total = result1-result2;
      txt.text(total);
    };
    function calc2(){
      onePtPrice = totalPtPrice/totalPtNum;
      var result1 = onePtPrice*0.9; //1회당 가격에 10%를 뺌
      var total = result1*nowPtNum;
      txt.text(total);
    };
    
    //옵션창

    var optionVal = 'option1'
    $('.option').on({
      click:function(){
        optionVal = $(this).val();
      },
    });
    
    
    //모달창
    var modal = $('#modal');
//계산하기
    $('.result-btn').on({
      click:function(){
        if(totalPtPrice === '' || totalPtNum === '' || nowPtNum === ''){
          $('.guid-3').addClass('on')
          return;
        }
        else {
          $('.guid-3').removeClass('on')
          if(optionVal===option1){calc1();}
          else{calc2();}
          modal.addClass('on');
        }
      }
    });
    $('.close-btn').on({
      click:function(){
        modal.removeClass('on');
      }
    })
    
    
    })(jQuery);
