<?php
//�������ռǹ����� - php�汾 ; By Zxwy ; ��ҳģ���������
include('setting.php'); //�����Զ������
$pheader = 'public/header.ht'; //headerģ��·��
$phead = 'public/head.ht'; //headģ��·��
$pinclude = 'public/include.ht'; //includeģ��·��
$pfooter = 'public/footer.ht'; //footerģ��·��
//$err = 0; //��������ͳ��
if (file_exists($pheader)) {
    $header = file_get_contents($pheader);
} else {
    //$err == $err++;
    echo 'ȱ��headerģ��';
}
if (file_exists($phead)) {
    $head = file_get_contents($phead);
    $head = str_replace('[$title]', $title, $head); //�滻title����
    $head = str_replace('[$keywords]', $keywords, $head); //�滻keywords����
    $head = str_replace('[$description]', $description, $head); //�滻description����
} else {
    //$err == $err++;
    echo 'ȱ��headģ��';
}
if (file_exists($pinclude)) {
    $include = file_get_contents($pinclude);
} else {
    //$err == $err++;
    echo 'ȱ��includeģ��';
}
if (file_exists($pfooter)) {
    $footer = file_get_contents($pfooter);
    $footer = str_replace('[$copyright]', $copyright, $footer); //�滻copyright����
} else {
    //$err == $err++;
    echo 'ȱ��footerģ��';
}

?>