Add this to your frontend code

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script src="https://pixie.jubi.ai/api/pixieapi.js"></script>
    <script>
        ;(async()=>{
            let resp=await pixieapi.signup("kanauj1s2","kanaujs","kanaujs","q45@hX")
            resp = await pixieapi.signin("kanauj1s2","kanaujs")
            resp = await pixieapi.checkLogin()
        })()
        
    </script>