package Utility;

public class IdCodeVerifier {

    public Boolean idCodeCorrect(String idCode){
           /*        Isikukoodi kontrollnumber formeeritakse "Moodul 11" meetodil, kasutades I või II astme kaalu:
              I astme kaal: 1 2 3 4 5 6 7 8 9 1
              II astme kaal: 3 4 5 6 7 8 9 1 2 3
              See tähendab, et isikukoodi kümme esimest numbrit korrutatakse igaüks omaette I astme kaaluga, korrutised liidetakse.
              Saadud summa jagatakse 11ga. Kui jagatise jääk ei võrdu 10ga, on jääk kontrollnumbriks.
              Kui jääk võrdub 10ga, siis korrutatakse koodi kümme esimest numbrit igaüks omaette II astme kaaluga.
              Korrutised liidetakse. Saadud summa jagatakse 11ga. Kui jääk ei võrdu 10ga, on saadud jääk kontrollnumbriks.
              Kui jääk võrdub 10ga, siis on kontrollnumber 0.*/

        if(idCode.length()!= 11) return false;
        int[]idCodeArr = new int[11];
        for(int i = 0; i < 11; i++) {
            if (Character.isDigit(idCode.charAt(i))) {
                idCodeArr[i] = Character.getNumericValue(idCode.charAt(i));
            }else{
                return false;
            }
        }

        int[] wages1 = {1,2,3,4,5,6,7,8,9,1};
        int sum1=0;
        for(int i = 0; i < 10; i++) {
            sum1 += idCodeArr[i]*wages1[i];
        }
        int module1 = sum1%11;
        if(module1 != 10){
            return module1 == idCodeArr[10];
        }
        int[] wages2 = {3,4,5,6,7,8,9,1,2,3};
        int sum2 = 0;
        for(int i = 0; i < 10; i++) {
            sum2 += idCodeArr[i]*wages2[i];
        }
        int module2 = sum2%11;
        if(module2 !=10){
            return module2 == idCodeArr[10];
        }
        return (idCodeArr[10] == 0);
    }
}
