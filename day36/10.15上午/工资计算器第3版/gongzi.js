define(function(){
    function calc(jishu,jixiao,jiangjin){
        // 计算总额
        var total = jishu + jixiao + jiangjin
        
        // 计算计税工资
        var jishui =  total * (1 - 0.08 - 0.02 - 0.005 - 0.08) - 20
        
        // 计税基数
        var shuiji =  jishui > 3500 ?  jishui - 3500 : 0;
        var shui = 0;
        
        // 计算个人所得税
        if (shuiji <= 0) { shui = 0; }
        if (shuiji <= 1500) { shui = shuiji * 0.03; }
        else if (shuiji <= 4500) { shui = shuiji * 0.1 - 105; }
        else if (shuiji <= 9000) { shui = shuiji * 0.2 - 555; }
        else if (shuiji <= 35000) { shui = shuiji * 0.25 - 1005; }
        
        var shifa = jishui - shui
        
        return {
            total:total,
            shebao: {
                yanglao: jishu * 0.08,
                yiliao: jishu * 0.02,
                shiye: jishu * 0.005,
                gongjijin: jishu * 0.08,
                tongchou: 20,
            },
            jishui: jishui,
            shuiji: shuiji,
            shui: shui,
            shifa: shifa
        }
    }
    return calc    
})
