<?php
//�������ռǹ����� - php�汾 ; By Zxwy ; ���ݼ���ģ��
$page = $_GET['page']; //ҳ��
$pagesize = $_GET['pagesize']; //��������
$r1 = $_GET['r1']; //Status
$id = $_GET['id']; //Ψһʶ����

$pjht = 'static/api/beta/searchNewsKeywordsList/testindex.jht'; //��ģ��·��
if (file_exists($pjht)) {
    $jht = file_get_contents($pjht); //����
    include('static/api/beta/searchNewsKeywordsList/' . $id . '/setting.php'); //��������
    $jht = str_replace('[$r1]', $r1, $jht); //�滻r1����
    $jht = str_replace('[$page]', $page, $jht); //�滻page����
    $jht = str_replace('[$pagesize]', $pagesize, $jht); //�滻pagesize����
    $jht = str_replace('[$total]', $total, $jht); //�滻total����
    $totalpage = ceil($total / $pagesize); //����totalpage
    $jht = str_replace('[$totalpage]', $totalpage, $jht); //�滻totalpage����
    $p = $page * $pagesize - $pagesize; //���㷭ҳ��ز���
    for ($i = 0; $i < $pagesize; $i++) {
        $file = 'static/api/beta/searchNewsKeywordsList/' . $id . '/' . ($i + $p) . '.js'; //�ļ�
        if (file_exists($file)) {
            $result .= file_get_contents($file);
            //$js .= $file . ' <br> ';
        }
    }
    $jht = str_replace('[$result]', $result, $jht); //�滻result����
    //echo $jht;
    //echo $js;
    //echo $p;
} else {
    //echo 'ȱ��testindexģ��';
    http_response_code(404);
}
?>