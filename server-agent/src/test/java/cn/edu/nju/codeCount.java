package cn.edu.nju;

import java.io.*;

/**
 * Created by chezeyu on 2016/7/21.
 */
public class codeCount {
    static long  normalLine=0;
    static long commentLine=0;
    static long whiteLine=0;

    public static void p(Object obj){
        System.out.println(obj);
    }
    public static void countcode(File f){
        BufferedReader br=null;
        boolean bln=false;
        try{
            br=new BufferedReader(new FileReader(f));
            String  line="";
            try {
                while((line = br.readLine()) != null) {
                    line=line.trim();
                    if(line.matches("^[\\s&&[^\\n]]*$")){
                        whiteLine+=1;
                    }else if(line.startsWith("/*")&&!line.equals("*/")){
                        commentLine+=1;
                        bln=true;
                    }else if (bln==true){
                        commentLine+=1;
                        if(line.endsWith("*/")){
                            bln=false;
                        }
                    }else if(line.startsWith("/*")&&line.endsWith("*/")){
                        commentLine+=1;
                    }else if(line.startsWith("//")){
                        commentLine+=1;
                    }else {
                        normalLine+=1;
                    }
                }
            }
            catch (IOException e) {
                e.printStackTrace();
            }
        }catch(FileNotFoundException e){
            e.printStackTrace();
        }finally {
            if(br!=null){
                try {
                    br.close();
                    br=null;
                } catch (IOException e) {
                    e.printStackTrace();
                }

            }
        }

    }

    public static void main(String args[]){
        //读取该目录下面的 所有 .java 文件进行统计。目前没进行文件夹递归访问
        File f=new File("D:\\SEP-MaROMS\\server-agent\\src\\test\\java\\cn\\edu\\nju\\RepairFormTest");
        File[] files=f.listFiles();
        for (File eachfile:files){
            if(eachfile.getName().matches(".*\\.java$")){
                countcode(eachfile);
            }
        }
        p("注释的代码行数:"+commentLine);
        p("空白的代码行数:"+whiteLine);
        p("有效的代码行数:"+normalLine);
        p(commentLine+whiteLine+normalLine);
    }

}
