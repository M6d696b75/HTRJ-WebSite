<?php
//�������ռǹ����� - php�汾 ; By Zxwy ; �Զ���ģ���������
//ģ���Զ���Ԫ�أ�û������CMS�Ļ������ܣ�����ʹ��֧��GBK������ַ���
$title = '�������ռǡ��ٷ���վ -Ԫ����Ů�����������'; //��վ����
$keywords = '�����ռ�,��������,menhera,�����,�����ռ�ԤԼ,�����ռ�,�������Ů,����,��������,menhera,�в���,�����轴,����ľʵ,����̫һ,line,����,����,���,�ռ�,����,��װ,��Ӫ,װ��,����Ԫ,����Ů,�����,��,Ů��,����,��ϵ,�ձ�,�Ի�,����,��������,����Զ��,Сɭ��������ռǲ��ԣ������ռ�����'; //��վ�ؼ���
$description = '�������ռǡ�����ȫ���ı������Ů�������ң�menhera���������������������ǽ��ڡ������ռǡ��п���һ�������ọ́�ÿ��ʮ���ӣ����������ɣ�'; //��վ����
$copyright = 'Copyright &copy;2021-2023 ZxwyWebSite All rights reserved.'; //�ײ���Ȩ��Ϣ��֧��html�﷨

//������...

//ע������ʹ��HTML�﷨����ͨ���·�ģ����ӱ���
/*
$copyright = <<<EOF
    <a href="https://www.zxwy.tk/" target="_blank">Copyright &copy;2021-2023 ZxwyWebSite All rights reserved.</a>
EOF;
*/

//���±���������Ҫ��...

//�������ռǹ����� - php�汾 ; By Zxwy ; ��ҳģ���������
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