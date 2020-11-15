'use strict'
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');

/**
 * 指定した要素に診断結果用のタグを設定する。
 * @param {HTMLElement} lelment HTMLの要素
 */
function removeAllChildren(element) {
    while (element.firstChild) {//なにかタグがある限りループ
        element.removeChild(element.firstChild);
    }
}

assessmentButton.onclick = () => {
    const userName = userNameInput.value;
    if (userName.length === 0){
        //名前が空の時は処理を終了する
        return;
    }

    //診断結果表示エリアの作成
    removeAllChildren(resultDivided);
    //result-areaにh3タグで'診断結果'という文字を表示
    const header = document.createElement('h3');//h3タグを作る
    header.innerText = '診断結果';//h3タグに'診断結果の文字列を設定'
    resultDivided.appendChild(header);//result-areaにh3変数を設定

    //result-areaにｐタグで診断結果を表示
    const paragraph = document.createElement('p');
    const result = assessment(userName);
    paragraph.innerText = result;
    resultDivided.appendChild(paragraph);

    //Tweet ボタンの表示
    removeAllChildren(tweetDivided);//Tweetエリアの初期化

    //aタグを作って属性を設定する
    const anchor = document.createElement('a');
    const hrefValue =
          'https://twitter.com/intent/tweet?button_hashtag=' + 
          encodeURIComponent('あなたのいいところ') + 
          '&ref_src=twsrc%5Etfw';
    anchor.setAttribute('href',hrefValue);
    anchor.className = 'twitter-hashtag-button'
    anchor.setAttribute('data-text',result);
    anchor.innerText = 'Tweet #あなたのいいところ';

    //aタグをHTMLとして追加する
    tweetDivided.appendChild(anchor);

    //scriptタグを作る
    const script = document.createElement('script');
    script.setAttribute('src','https://platform.twitter.com/widgets.js');

    //scriptタグをHTMLとして追加する
    tweetDivided.appendChild(script);
    } ;

    //入力欄でEnterキーを押したときに診断を実行
    userNameInput.onkeydown = event => {
        if (event.key === 'Enter' ) {
            assessmentButton.onclick();
        }
    }

const answers = [
    '{userName}のいいところは声です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。',
    '{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
    '{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
    '{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。',
    '{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
    '{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。',
    '{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
    '{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。',
    '{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
    '{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。',
    '{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。',
    '{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。',
    '{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。',
    '{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
    '{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。',
    '{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。',
    ];

        /**
         * 名前の文字列を渡すと診断結果を返す関数
         * @param {string} userName ユーザーの名前
         * @return {string} 診断結果
         */
function assessment(userName){
     //すべての文字を足し算する
     let sumOfCharCode = 0;
     for (let i = 0; i < userName.length; i++){
        //userName(文字列)を数値(漢字だと5桁)に変換
        sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
     }
    //5桁の数値を回答結果の範囲（0~15）に変換
    const index  = sumOfCharCode % answers.length;
    //診断結果
   let result = answers[index];

   result = result.replace(/\{userName\}/g,userName);//置換
   return result;
}

//テストコード
console.assert(
    assessment('太郎') === '太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。',
    '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
);

console.assert(
    assessment('太郎') === assessment('太郎'),
    '入力が同じ名前なら、同じ診断結果を出力する処理が正しくありません。'
);
