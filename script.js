$(function () {
    //taking input in variables
    var anim_id;
    var container = $("#container");
    var car = $("#car");
    var car_1 = $("#car1");
    var car_2 = $("#car2");
    var car_3 = $("#car3");
    var line1 = $("#line1");
    var line2 = $("#line2");
    var line3 = $("#line3");
    var reset_div = $("#restart_div");
    var restart_btn= $("#restart");
    var score = $("#score");
    var car_down;
    //pre calculated values
    var car_width = car.width();
    var car_height = car.height();
    var container_left = parseInt(container.css("left"));
    var container_right = parseInt(container.css("right"));
    var container_width = container.width() - car_width;
    var container_height = container.height() - car_height;
    //other declarations
    var gover = false;
    var mleft = false;
    var mright = false;
    var mdown = false;
    var mup = false;
    var count = 1;
    var score_count = 1;
    var speed = 2;
    var lspeed = 5;
    reset_div.hide();
    //        GAME BEGIENS HERE
    /*------------left-------*/
    $(document).keydown(function (e) {
        var key = e.keyCode;
        if (gover == false) {
            if (key == 37 && mleft == false) {
                mleft = requestAnimationFrame(left);
            }
            else if (key == 38 && mup == false) {
                mup = requestAnimationFrame(up);
            }
            else if (key == 39 && mright == false) {
                mright = requestAnimationFrame(right);
            }
            else if (key == 40 && mdown == false) {
                mdown = requestAnimationFrame(down);
            }
        }
    });
    $(document).keyup(function (e) {
        var key = e.keyCode;
        if (key === 37) {
            cancelAnimationFrame(mleft);
            mleft = false;
        }
        else if (key === 38) {
            cancelAnimationFrame(mup);
            mup = false;
        }
        else if (key === 39) {
            cancelAnimationFrame(mright);
            mright = false;
        }
        else if (key === 40) {
            cancelAnimationFrame(mdown);
            mdown = false;
        }
    });
    /*-----functions-----*/
    function right() {
        if (gover == false && parseInt(car.css("left")) < container_width) {
            car.css("left", parseInt(car.css("left")) + 5);
            mright = requestAnimationFrame(right);
        }
    }

    function left() {
        if (gover == false && parseInt(car.css("left")) > 0) {
            car.css("left", parseInt(car.css('left')) - 5);
            mleft = requestAnimationFrame(left);
        }
    }

    function down() {
        if (gover == false && parseInt(car.css("top")) < container_height) {
            car.css("top", parseInt(car.css("top")) + 5);
            mdown = requestAnimationFrame(down);
        }
    }

    function up() {
        if (gover == false && parseInt(car.css("top")) > 0) {
            car.css("top", parseInt(car.css('top')) - 5);
            mup = requestAnimationFrame(up);
        }
    }
    //animaton of game starts
    requestAnimationFrame(repeat);

    function repeat() 
    {
        if (gover == false) 
        {
            count++;
            if(count%20==0)
                {
                    score_count++;
                    score.text("sCORE:"+score_count);
                }
            if(collide(car_1,car) || collide(car_2,car) || collide(car_3,car))
                {
                    stopgame();
                }
            car_down(car_1);
            car_down(car_2);
            car_down(car_3);
            line_down(line1);
            line_down(line2);
            line_down(line3);
            requestAnimationFrame(repeat);
        }
    }

    function car_down(car) {
        var cur_top = parseInt(car.css("top"));
        if (cur_top > container_height) {
            cur_top = -200;
            var car_left = Math.random() * container_width;
        }
//        if(score_count%10==0)
//            speed++;
        car.css("top", cur_top + speed);
        car.css("left", car_left);
    }

    function line_down(line) {
        var line_top = parseInt(line.css("top"));
        if (line_top > container_height) {
            line_top = -200;
        }
//        if(score_count%5==0)
//                {
//                    lspeed++;
//                }
        line.css("top",line_top +lspeed);
    }
    function stopgame()
    {
        gover=true;
        reset_div.slideDown();
        restart_btn.focus();
        cancelAnimationFrame(animid);
        cancelAnimationFrame(mleft);
        cancelAnimationFrame(mright);
        cancelAnimationFrame(mup);
        cancelAnimationFrame(mdown);
    }
    restart_btn.click(function(){
       location.reload(); 
    });
    //game ends here
    function collide($div1,$div2)
    {
        var x1=$div1.offset().left;
        var y1=$div1.offset().top;
        var h1=$div1.outerHeight(true);
        var w1=$div1.outerWidth(true);
        var b1=y1+h1;
        var r1=x1+w1;
        var x2=$div2.offset().left;
        var y2=$div2.offset().top;
        var h2=$div2.outerHeight(true);
        var w2=$div2.outerWidth(true);
        var b2=y2+h2;
        var r2=x2+w2;
        if(b1<y2 || y1>b2 || r1<x2 || x1>r2)
            return false;
        return true;
    }
});