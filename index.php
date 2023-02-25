<?php
//�������ռǹ����� - php�汾 ; By Zxwy ; ������
$urlpath = $_SERVER['PHP_SELF']; //����·��
$path = str_replace('/index.php', null, $urlpath); //ȥ��urlpath�е�php�ļ���
header('Content-type: text/html;charset=gbk'); //���巵������

//2023-02-24 ��дģ�飬�ع��߼����Ż�ִ��Ч��
switch ($path) {
    case '': //��ҳģ��
    case '/':
        include('setting.php'); //������ҳ����
        $pindex = 'public/newindex.ht'; //indexģ��·��
        if (file_exists($pindex)) {
            $index = file_get_contents($pindex); //����
            $index = str_replace('[$head]', $head, $index); //�滻headģ��
            $index = str_replace('[$footer]', $footer, $index); //�滻footerģ��
            $index = str_replace('[$include]', $include, $index); //�滻includeģ��
            echo $index;
        } else {
            echo 'ȱ��indexģ��';
        }
        break;
    case '/news': //����ģ��
        include('setting.php'); //������ҳ����
        $pnews = 'public/news.ht'; //newsģ��·��
        if (file_exists($pnews)) {
            $news = file_get_contents($pnews); //����
            $news = str_replace('[$head]', $head, $news); //�滻headģ��
            $news = str_replace('[$header]', $header, $news); //�滻headerģ��
            $news = str_replace('[$footer]', $footer, $news); //�滻footerģ��
            $news = str_replace('[$include]', $include, $news); //�滻includeģ��
            echo $news;
        } else {
            echo 'ȱ��newsģ��';
        }
        break;
    case '/list': //�б�ģ��
        include('setting.php'); //������ҳ����
        $plist = 'public/list.ht'; //listģ��·��
        if (file_exists($plist)) {
            $list = file_get_contents($plist); //����
            $list = str_replace('[$head]', $head, $list); //�滻headģ��
            $list = str_replace('[$header]', $header, $list); //�滻headerģ��
            $list = str_replace('[$footer]', $footer, $list); //�滻footerģ��
            $list = str_replace('[$include]', $include, $list); //�滻includeģ��
            echo $list;
        } else {
            echo 'ȱ��listģ��';
        }
        break;
    case '/videos': //��Ƶģ��
        include('setting.php'); //������ҳ����
        $pvideos = 'public/videos.ht'; //videosģ��·��
        if (file_exists($pvideos)) {
            $videos = file_get_contents($pvideos); //����
            $videos = str_replace('[$head]', $head, $videos); //�滻headģ��
            $videos = str_replace('[$header]', $header, $videos); //�滻headerģ��
            $videos = str_replace('[$footer]', $footer, $videos); //�滻footerģ��
            $videos = str_replace('[$include]', $include, $videos); //�滻includeģ��
            echo $videos;
        } else {
            echo 'ȱ��videosģ��';
        }
        break;
    case '/api': //Apiģ��
        //2023-02-25 ��дApiģ�飬�޸����ݴ洢�ṹ
        $p1 = $_GET['p1']; //��������
        header('Content-type: text/plain; charset=utf-8'); //��������
        $psetting = 'static/api/beta/' . $p1 . '/load.php'; //�����ļ�·��
        if (file_exists($psetting)) {
            include($psetting); //���������ļ�
            echo $jht;
        } else {
            http_response_code(404);
        }
        /*$papi = 'static/api/' . $p1 . '/' . $id . '.js'; //����·����һ��Ϊ���·�������ݺã�
        if (file_exists($papi)) {
            $api = file_get_contents($papi); //����
            $api = str_replace('[$r1]', $r1, $api); //�滻r1����
            echo $api;
        } else {
            http_response_code(404);
        }*/
        break;
    case '/snapi': //����Apiģ�飨��Ӧ�ٷ��ӿ�searchNews.php��
        $p0 = $_GET['p0']; //???
        $id = $_GET['id']; //ID
        header('Content-Type: text/plain; charset=utf-8'); //��������
        $psnapi = 'static/api/searchNews/' . $id . '.js'; //����·��
        if (file_exists($psnapi)) {
            $snapi = file_get_contents($psnapi); //����
            echo $snapi;
        } else {
            http_response_code(404);
        }
        break;
    case '/m': //�ֻ�����
        $pm = 'public/m.ht'; //mobileģ��·��
        if (file_exists($pm)) {
            $m = file_get_contents($pm); //����
            echo $m;
        } else {
            echo 'ȱ��mģ��';
        }
        break;
    default: //����·��
        http_response_code(404);
    //break;
}
?>