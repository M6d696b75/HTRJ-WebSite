<?php
//�������ռǹ����� - php�汾 ; By Zxwy ; ������
$urlpath = $_SERVER['PHP_SELF']; //����·��
$path = str_replace($_SERVER['SCRIPT_NAME'], null, $urlpath); //ȥ��urlpath�е�php�ļ���
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
        $page = $_GET['page']; //ҳ��
        $pagesize = $_GET['pagesize']; //��������
        $r1 = $_GET['r1']; //Status
        $id = $_GET['id']; //Ψһʶ����
        header('Content-type: text/plain; charset=utf-8'); //��������
        $papi = 'static/api/beta/' . $p1 . '/'; //Api��Ŀ¼
        if (file_exists($papi . 'testindex.jht') && $p1) {
            $jht = file_get_contents($papi . 'testindex.jht'); //������ģ��
            if (file_exists($papi . $id . '/setting.php')) {
                include($papi . $id . '/setting.php');
                $jht = str_replace('[$r1]', $r1, $jht); //�滻r1����
                $jht = str_replace('[$page]', $page, $jht); //�滻page����
                $jht = str_replace('[$pagesize]', $pagesize, $jht); //�滻pagesize����
                $jht = str_replace('[$total]', $total, $jht); //�滻total����
                $totalpage = ceil($total / $pagesize); //����totalpage
                $jht = str_replace('[$totalpage]', $totalpage, $jht); //�滻totalpage����
                $p = $page * $pagesize - $pagesize; //���㷭ҳ��ز���
                for ($i = 0; $i < $pagesize; $i++) {
                    $file = $papi . $id . '/' . ($i + $p) . '.js'; //�ļ�·��
                    if (file_exists($file)) {
                        $result .= file_get_contents($file);
                    }
                }
                $jht = str_replace('[$result]', $result, $jht); //�滻result����
                echo $jht;
            } else {
                if (!$id) {
                    echo $jht; //�����ϱ��ӿ�
                    //http_response_code(200);
                } else {
                    http_response_code(404);
                }
            }
        } else {
            http_response_code(404);
        }
        break;
    case '/snapi': //����Apiģ�飨��Ӧ�ٷ��ӿ�searchNews.php��
        //2023-02-26 ��д����Api��֧��ƴ������
        $id = $_GET['id']; //Ψһʶ����
        header('Content-Type: text/plain; charset=utf-8'); //��������
        $psnapi = 'static/api/beta/searchNews/'; //������Ŀ¼
        if (file_exists($psnapi . 'testsnapi.jht') && file_exists($psnapi . 'linklist.jht')) {
            $snapi = file_get_contents($psnapi . 'testsnapi.jht'); //����ģ��
            $linklist = file_get_contents($psnapi . 'linklist.jht'); //�����ظ��б�
            if (file_exists($psnapi . 'data/' . $id . '.js')) {
                $data = file_get_contents($psnapi . 'data/' . $id . '.js'); //��������
                $snapi = str_replace('[$data]', $data, $snapi); //�滻data����
                $snapi = str_replace('[$linklist]', $linklist, $snapi); //�滻linklist����
                echo $snapi;
            } else {
                if (file_exists($psnapi . 'nonews.jht') && $id) {
                    $nonews = file_get_contents($psnapi . 'nonews.jht'); //δ�ҵ�����ģ��
                    $snapi = str_replace('[$data]', $nonews, $snapi); //�滻data����
                    $snapi = str_replace('[$linklist]', $linklist, $snapi); //�滻linklist����
                    echo $snapi;
                } else {
                    http_response_code(404);
                }
            }
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
    case '/favicon.ico': //ͼ���ض���
        $picon = 'static/favicon.ico';
        if (file_exists($picon)) {
            header('Content-Type: image/x-icon');
            echo file_get_contents($picon);
        } else {
            http_response_code(404);
        }
        break;
    default: //����·��
        /*$isimg = strstr($path,'/static/api/img/'); //ͼƬCDN
        if ($isimg) {
            $img = str_replace('/static/api/img/', null, $path);
            header("Location: https://b2eu.zw-cdn.tk/gh/htrj-website/img/$img");
            break;
        }
        $isvod = strstr($path,'/static/api/vod/'); //��ƵCDN
        if ($isvod) {
            $vod = str_replace('/static/api/vod/', null, $path);
            header("Location: https://b2eu.zw-cdn.tk/gh/htrj-website/vod/$vod");
            break;
        }*/
        http_response_code(404);
        //echo $path;
    //break;
}
?>