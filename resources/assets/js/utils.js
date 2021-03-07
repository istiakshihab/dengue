import React, {Component} from 'react';

export default function Footer(){
    return(
        <footer flex="none">
        <a href="https://pipilika.com/">
            <img src = "/img/logo.png" className = "img-responsive logo footer-logo" />
        </a>
        <div className="center-footer">
            <ul className = "footer-menu">
                <li>
                    <a href="http://pipilika.com/" target="_blank">
                        <span><img src = "/img/favicons/pipilika.png" className="left-fav"/> </span>পিপীলিকা
                    </a>
                </li>
                <li>
                    <a href="http://product.pipilika.com/" target="_blank">
                        <span><img src = "/img/favicons/products.png" className="left-fav"/> </span>
                        পিপীলিকা কেনাকাটা
                    </a>
                </li>
                <li>
                    <a href="http://news.pipilika.com/" target="_blank">
                        <span><img src = "/img/favicons/news.png" className="left-fav"/> </span>শীর্ষ সংবাদ
                    </a>
                </li>
                <li>
                    <a href="http://jobs.pipilika.com/" target="_blank">
                        <span><img src = "/img/favicons/jobs.png" className="left-fav"/> </span>জব সার্চ
                    </a>
                </li>
                <li>
                    <a href="http://library.pipilika.com/" target="_blank">
                        <span><img src = "/img/favicons/library.png" className="left-fav"/> </span>লাইব্রেরি সার্চ
                    </a>
                </li>
            </ul>
            <div className="clearfix"></div>
        </div>

        <div className="footer-credit">কারিগরি সহায়তায়: <b>পিপীলিকা </b>এবং  <b>শাহজালাল বিজ্ঞান ও প্রযুক্তি বিশ্ববিদ্যালয় </b></div>

    </footer>
    )
}