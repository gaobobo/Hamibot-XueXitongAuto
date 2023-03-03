/**
    XueXitong Auto Watching Program
    Copyright (C) 2023  Shibo Gao

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as published
    by the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

function appPackageRetart (appPackageName) {     //restart app
    app.openAppSetting(appPackageName);
    sleep(3000);
    click('强制停止');
    sleep(3000);
    click('确定');
    sleep(3000);
    app.launch(appPackageName);
   }
   function xuexitongToCoursePage () {     //open user profile and course
       while(!click('我'));
       while(!click('课程'));
       sleep(3000);
   }
//for check same items vars
var courseName;
var courseAuthor;
var courseEnd;
function xuexitongGetCoursesList (courseInfo) {   //get courses List
    var coursesUICollector = id('rl_item').find();
    coursesUICollector.forEach(function(child){

        var tv_name = child.findOne(id('tv_name'));
        var tv_subtitile = child.findOne(id('tv_subtitle'));

        if(tv_name==null || tv_subtitile==null) return;
        if(tv_name.text()==courseName && tv_subtitile.text()==courseAuthor) return;   //skip same item (although the same infact)

        courseName = tv_name.text();
        courseAuthor = tv_subtitile.text();
        courseEnd = !child.find(id('tv_end_course_tag')).empty();

        courseInfo.push([courseName,courseAuthor,courseEnd,'0']);
    });
    return courseInfo;
  }
  function xuexitongGetItemList(itemsList,item){
    var courseItems = id('sub_node').find();

    if(courseItems.empty()) {   //if items empoty, next for.
        item[3] = 1;
        back();
        sleep(2000);
        return;
    }

    courseItems.forEach(function(child){
        var itemIndex = child.findOne(id('tv_sub_index'));
        var itemPoint = child.findOne(id('tv_icon'));
        if (itemIndex == null || itemPoint == null) return;
        itemsList.push([itemIndex.text(),itemPoint.text()]);
    });
  }
  function xuexitongVedioSelect (choice){
    // @ts-ignore
    className('android.widget.ListView').findOnce().children().forEach(function(child){
        child.children().forEach(function(child){
            if(child.text()==choice) child.click();
        })
    });
  }
  function xuexitongVedioAnwser(){
    if(text('多选题').findOnce() != null) {
        xuexitongVedioSelect('A');  //abc
        sleep(1000);
        xuexitongVedioSelect('B');
        sleep(1000);
        xuexitongVedioSelect('C');
        sleep(1000);
        click('提交');
            sleep(1000);
        if(text('回答错误').findOnce() != null){
            sleep(1000);
            xuexitongVedioSelect('A');      //bcd
            sleep(1000);
            xuexitongVedioSelect('D');
            sleep(1000);
            click('提交');
            sleep(1000);
            if(text('回答错误').findOnce() != null){
                xuexitongVedioSelect('D');      //bc
                sleep(1000);
                click('提交');
                sleep(1000);
                if(text('回答错误').findOnce() != null){
                    xuexitongVedioSelect('A');      //ab
                    sleep(1000);
                    xuexitongVedioSelect('C');
                    sleep(1000);
                    click('提交');
                    sleep(1000);
                    if(text('回答错误').findOnce() != null){
                        xuexitongVedioSelect('B');  //ac
                        sleep(1000);
                        xuexitongVedioSelect('C');
                        sleep(1000);
                        click('提交');
                        sleep(1000);
                        if(text('回答错误').findOnce() != null){
                            xuexitongVedioSelect('C');      //ad
                            sleep(1000);
                            xuexitongVedioSelect('D');
                            sleep(1000);
                            click('提交');
                            sleep(1000);
                            if(text('回答错误').findOnce() != null){
                                xuexitongVedioSelect('A');      //bd
                                sleep(1000);
                                xuexitongVedioSelect('B');
                                sleep(1000);
                                click('提交');
                                sleep(1000);
                                if(text('回答错误').findOnce() != null){
                                    xuexitongVedioSelect('B');      //cd
                                    sleep(1000);
                                    xuexitongVedioSelect('C');
                                    sleep(1000);
                                    click('提交');
                                    sleep(1000);
                                    if(text('回答错误').findOnce() != null){
                                        back();
                                        sleep(2000);
                                        back();
                                        sleep(2000);
                                        back();
                                        sleep(2000);
                                        return;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        } 
    }
    if(text('单选题').findOnce() != null) {
        xuexitongVedioSelect('A');      //a
        sleep(1000);
        click('提交');
        sleep(1000);
        if(text('回答错误').findOnce() != null){
            xuexitongVedioSelect('A');      //b
            sleep(1000);
            xuexitongVedioSelect('B');
            sleep(1000);
            click('提交');
            sleep(1000);
            if(text('回答错误').findOnce() != null){
                xuexitongVedioSelect('B');      //c
                sleep(1000);
                xuexitongVedioSelect('C');
                sleep(1000);
                click('提交');
                sleep(1000);
                if(text('回答错误').findOnce() != null){
                    xuexitongVedioSelect('C');      //d
                    sleep(1000);
                    xuexitongVedioSelect('D');
                    sleep(1000);
                    click('提交');
                    sleep(1000);
                    if(text('回答错误').findOnce() != null){
                        back();
                        sleep(2000);
                        back();
                        sleep(2000);
                        back();
                        sleep(2000);
                        return;
                    }
                }
            }
        }
    }
  }
  //const SELECT = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';


auto.waitFor();


var appPackageName = 'com.chaoxing.mobile';

//appPackageRetart(appPackageName);
sleep(15000);
xuexitongToCoursePage();


var courseInfo = new Array();
do
{
    xuexitongGetCoursesList(courseInfo);
    scrollDown(0);
    sleep(3000); 

}while(text('已经到底了').find().empty());

xuexitongGetCoursesList(courseInfo);    //unknown reason, the last page won't get info. So repeat it.


//appPackageRetart(appPackageName);
//xuexitongToCoursePage();
back();     //reset page location
sleep(3000);
click('课程');


courseInfo.forEach(function(item){
    if (item[2] == true && item[3] == 1) return;    //check if end or finish

    sleep(3000);
    while(!click(item[0])){
        scrollDown(0);
        sleep(3000);
    }

    sleep(3000);
    click('我已阅读，开始学习');    //jump info
    while(click('取消'));
    while(!click('章节',0));

    var courseFinishedUIObject = id('tv_job_unfinish_count').findOnce();
    var courseTotalUIObject = id('tv_job_total_count').findOnce();

    if (courseFinishedUIObject != null && courseTotalUIObject != null) {    //check percent if it has.
        var courseFinished = courseFinishedUIObject.text();
        var courseTotal = courseTotalUIObject.text().slice(3);
    
        if (courseFinished == courseTotal) {
            item[3] = 1;
            back();
            sleep(2000);
            return;
        }
    }

    var itemsList = new Array();

    /*
    var courseItems = id('sub_node').find();

    if(courseItems.empty()) {   //if items empoty, next for.
        item[3] = 1;
        back();
        sleep(2000);
        return;
    }

    courseItems.forEach(function(child){
        var itemIndex = child.findOne(id('tv_sub_index'));
        var itemPoint = child.findOne(id('tv_icon'));
        if (itemIndex == null || itemPoint == null) return;
        itemsList.push([itemIndex.text(),itemPoint.text()]);
    });
    */

    do {

        xuexitongGetItemList(itemsList,item);
        scrollDown(0);
        sleep(3000);

    } while (text('已经到底了').find().empty());

    xuexitongGetItemList(itemsList,item);

    back();
    sleep(3000);
    while(!click(item[0]));
    sleep(3000);

    itemsList.forEach(function(index){
        if (index[1] == '') return;

        while(!click(index[0])){
        //while(!click('10.1')){
            scrollDown(0);
            sleep(3000);
        };

        sleep(3000);
        text('视频').find().forEach(function(child){
            // @ts-ignore
            if (child.parent().className() == 'android.support.v7.app.ActionBar$Tab') child.parent().click();
        })
        sleep(3000);

        // @ts-ignore
        if(!text('任务点已完成').find().empty()) {
            item[1] = '';
            back();
            sleep(2000);
            return;
        }

        var player = text('播放').findOnce();
        // @ts-ignore
        if (player != null) {
            // @ts-ignore
            player.findOne(className('Button')).click()
            sleep(15000);
            while(id('start').findOnce() == null) {
                click('重试');
                xuexitongVedioAnwser();
                sleep(15000);
            }
        }else{
            item[1] = '';
            back();
            sleep(2000);
            return;
        }

    item[1] = '';
    back();
    sleep(2000);
    back();
    sleep(2000);
    })
    back();
    sleep(2000);
});
