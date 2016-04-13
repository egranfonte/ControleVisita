//----------------------------------------------------------//
//teste
function teste(teste){
    alert(teste);
}
//----------------------------------------------------------//
//imprime mensagem em tela

 function Imprime(msg) {
    document.getElementById('mensagem').innerHTML = msg;
}

//----------------------------------------------------------//
//focus
function setFocus(id){
    document.getElementById(id).focus();
}
//----------------------------------------------------------//
//WebStorage

// Tamanho atual do storage
function tamStorage(){
    var tam = sessionStorage.length;
    return tam;
}

//Limpar Dados
function limpar(){
    if(tamStorage()>0){
        var resposta = confirm("Excluir "+tamStorage()+" registro(s)?");
        if (resposta == true ){
            sessionStorage.clear();
            teste("Resgistros excluidos com sucesso.");
        }else{
            teste("Exclusão de registro cancelada com sucesso.");
        }    
    }else{
        teste("WebStorage sem resgitros para excluir");
    }
}
//----------------------------------------------------------//

//Excluir Geral

function Excluir(i,r){
    var resposta = confirm("Remover registro: "+i+" ?");
    if(resposta == true){
        //remove do storage
        sessionStorage.removeItem(i);
        //remove a linha da tabela
        var linha=r.parentNode.parentNode.rowIndex;
        document.getElementById('listar').deleteRow(linha-1);                        

    }else{
        teste("Exclusão de registro cancelada com sucesso.");
    }
}
//----------------------------------------------------------//

//Pagina visitante

function Visitante(nome, telefone, rg, cpf,motivo, sexo){
    this.referencia = "V";
    this.nome       = nome;
    this.telefone   = telefone;
    this.rg         = rg;
    this.cpf        = cpf;
    this.motivo     = motivo;
    this.sexo       = sexo;
}
function Cadastrar(param){
    // valores 
    var fnome       = document.getElementById("nome").value;
    var ftelefone   = document.getElementById("telefone").value;
    var frg         = document.getElementById("rg").value;
    var fcpf        = document.getElementById("cpf").value;
    var fmotivo     = document.getElementById("motivo").value;
    var fsexo       = RadioBt();  

    //if campos estiverem preenchidos  
    if (fnome != "" && ftelefone != "" && frg != "" && fcpf != "" && fmotivo != "" ){ 
        
        // criar novo objeto visitante
        var visitante = new Visitante(fnome,ftelefone,frg,fcpf,fmotivo,fsexo);

        if(param == "novo"){
            var proximo = tamStorage();
            sessionStorage.setItem(proximo,JSON.stringify(visitante));
            
            alert("Cadastro realizado com sucesso!");
            document.getElementById("nome").value       = "";
            document.getElementById("telefone").value   = "";
            document.getElementById("rg").value         = "";
            document.getElementById("cpf").value        = "";
            document.getElementById("motivo").value     = "";
            
            //location.href="visitante.html";
        }else{
            sessionStorage.setItem(param,JSON.stringify(visitante));
            alert("Dados alterados com sucesso!");
            location.href="listar_visitante.html";
        }

    }else{
        alert("Todos os dados devem ser preenchidos!!!");
    }     
}//fim cadastrar()

//radio buton sexo
function RadioBt() {
    var RadioSx = document.formV.sexo;

    for(var i=0;i<RadioSx.length;i++) {       
        if(RadioSx[i].checked) {          
            var radioCk = RadioSx[i].id;
        }  
    }
    return radioCk;
}

//----------------------------------------------------------//
//EDITAR visitante
//função obter string editar
function ObterValorQueryString(atributo) {
    return location.search.replace("?", "").replace(atributo + "=", "");
}

function Editar() {
    var idX = ObterValorQueryString("id");

    if(idX != ""){

        var objeto = JSON.parse(sessionStorage.getItem(idX));
        document.forms["formV"].elements["nome"].value      = objeto.nome;
        document.forms["formV"].elements["telefone"].value  = objeto.telefone;
        document.forms["formV"].elements["rg"].value        = objeto.rg;
        document.forms["formV"].elements["cpf"].value       = objeto.cpf;
        document.forms["formV"].elements["motivo"].value    = objeto.motivo;
        document.formV.sexo.value                           = objeto.sexo;
        document.formV.btInserir.value                      = "Salvar";
        

        document.formV.btInserir.onclick = function (){
                Cadastrar(idX);
            }

        }
}
//----------------------------------------------------------//      

//Pagina listar visitante
    function Listar(){
        if (tamStorage()>0){
            var tituloTabela = document.getElementById("titulo");
            var corpoTabela = document.getElementById("listar"); 

            /* Titulo */
            var linha       = tituloTabela.insertRow();
            var chave       = linha.insertCell();
            var nome        = linha.insertCell();
            var telefone    = linha.insertCell();
            var rg          = linha.insertCell();
            var cpf         = linha.insertCell();
            var motivo      = linha.insertCell();
            var sexo        = linha.insertCell();
            var crud        = linha.insertCell();

            chave.innerHTML = "CODIGO";
            nome.innerHTML  = "NOME";
            telefone.innerHTML = "TELEFONE";
            rg.innerHTML    = "RG";
            cpf.innerHTML   = "CPF";
            motivo.innerHTML= "MOTIVO";
            sexo.innerHTML  = "SEXO";
            crud.innerHTML  ="CRUD";

            /* Corpo Tabela*/
            for(var i=0; i<=tamStorage();i++){ 
                chaveT = sessionStorage.key(i);
                var obj     = JSON.parse(sessionStorage.getItem(chaveT));
                //referencia visitante
                if(obj.referencia == "V"){
                    var linha       = corpoTabela.insertRow();
                    var chave       = linha.insertCell();
                    var nome        = linha.insertCell();
                    var telefone    = linha.insertCell();
                    var rg          = linha.insertCell();
                    var cpf         = linha.insertCell();
                    var motivo      = linha.insertCell();
                    var sexo        = linha.insertCell();
                    var crud        = linha.insertCell();

                    chave.innerHTML     = chaveT;
                    nome.innerHTML      = obj.nome;
                    telefone.innerHTML  = obj.telefone;
                    rg.innerHTML        = obj.rg;
                    cpf.innerHTML       = obj.cpf;
                    motivo.innerHTML    = obj.motivo;
                    sexo.innerHTML      = obj.sexo;
                    crud.innerHTML      ="<a class='botaoCrud' href=javascript:location.assign('visitante.html?id="+i+"');>Editar</a><input type='button'class='botaoCrud' onclick='Excluir("+i+",this)' value='Excluir'>";
                }

            }//fim corpo tabela
        //fim storage
        }else{
            teste("Storage vazio");
            location.href="index.html";
        }
    }//fim Listar()


//----------------------------------------------------------//

//Pagina Cadastrar Funcionario

function Funcionario(nome, ramal, sala, cod, setor, sexo){
    this.referencia = "F";
    this.nome       = nome;
    this.ramal      = ramal;
    this.sala       = sala;
    this.cod        = cod;
    this.setor      = setor;
    this.sexo       = sexo;
}
function CadastrarF(param){
    // valores 
    var nome    = document.getElementById("nome").value;
    var ramal   = document.getElementById("ramal").value;
    var sala    = document.getElementById("sala").value;
    var cod     = document.getElementById("cod").value;
    var setor   = document.getElementById("setor").value;
    var fsexo   = RadioBtF();  

    //if campos estiverem preenchidos  
    if (nome != "" && ramal != "" && sala != "" && cod != "" && setor != "" ){ 
        
        // criar novo objeto visitante
        var funcionario = new Funcionario(nome,ramal,sala,cod,setor,fsexo);

        if(param == "novo"){
            var proximo = tamStorage();
            sessionStorage.setItem(proximo,JSON.stringify(funcionario));
            
            alert("Cadastro realizado com sucesso!");
            document.getElementById("nome").value   = "";
            document.getElementById("ramal").value  = "";
            document.getElementById("sala").value   = "";
            document.getElementById("cod").value    = "";
            document.getElementById("setor").value  = "";
            //document.getElementById("sexo").value   = "";
            //location.href="visitante.html";
        }else{
            sessionStorage.setItem(param,JSON.stringify(funcionario));
            alert("Dados alterados com sucesso!");
            location.href="listar_funcionario.html";
        }

    }else{
        alert("Todos os dados devem ser preenchidos!!!");
    }     
}//fim cadastrar()

//radio buton sexo
function RadioBtF() {
    var RadioSx = document.formF.sexo;

    for(var i=0;i<RadioSx.length;i++) {       
        if(RadioSx[i].checked) {          
            var radioCk = RadioSx[i].id;
        }  
    }
    return radioCk;
}

//----------------------------------------------------------//
//EDITAR funcionario
//função obter string editar
function ObterValorQueryStringF(atributo) {
    return location.search.replace("?", "").replace(atributo + "=", "");
}

function EditarF() {
    var idX = ObterValorQueryStringF("id");

    if(idX != ""){

        var objeto = JSON.parse(sessionStorage.getItem(idX));
        document.forms["formF"].elements["nome"].value   = objeto.nome;
        document.forms["formF"].elements["ramal"].value  = objeto.ramal;
        document.forms["formF"].elements["sala"].value   = objeto.sala;
        document.forms["formF"].elements["cod"].value    = objeto.cod;
        document.forms["formF"].elements["setor"].value  = objeto.setor;
        document.formF.sexo.value                        = objeto.sexo;
        document.formF.btInserir.value                   = "Salvar";

        document.formF.btInserir.onclick = function (){
                CadastrarF(idX);
            }

        }
}

//----------------------------------------------------------//

//Pagina listar funcionario
    function ListarF(){
        if (tamStorage()>0){

            var tituloTabela = document.getElementById("titulo");
            var corpoTabela  = document.getElementById("listar"); 

            /* Titulo */
            var linha       = tituloTabela.insertRow();
            var chave       = linha.insertCell();
            var nome        = linha.insertCell();
            var ramal       = linha.insertCell();
            var sala        = linha.insertCell();
            var cod         = linha.insertCell();
            var setor       = linha.insertCell();
            var sexo        = linha.insertCell();
            var crud        = linha.insertCell();

            chave.innerHTML = "CODIGO";
            nome.innerHTML  = "NOME";
            ramal.innerHTML = "RAMAL";
            sala.innerHTML  = "SALA";
            cod.innerHTML   = "COD";
            setor.innerHTML = "SETOR";
            sexo.innerHTML  = "SEXO";
            crud.innerHTML  ="CRUD";

            /* Corpo Tabela*/
            for(var i=0; i<tamStorage();i++){
                chaveF  = sessionStorage.key(i);
                var obj = JSON.parse(sessionStorage.getItem(chaveF));
                //referencia visitante
                if(obj.referencia == "F"){
                    var linha  = corpoTabela.insertRow();
                    var chave  = linha.insertCell();
                    var nome   = linha.insertCell();
                    var ramal  = linha.insertCell();
                    var sala   = linha.insertCell();
                    var cod    = linha.insertCell();
                    var setor  = linha.insertCell();
                    var sexo   = linha.insertCell();
                    var crud   = linha.insertCell();

                    chave.innerHTML = chaveF;
                    nome.innerHTML  = obj.nome;
                    ramal.innerHTML = obj.ramal;
                    sala.innerHTML  = obj.sala;
                    cod.innerHTML   = obj.cod;
                    setor.innerHTML = obj.setor;
                    sexo.innerHTML  = obj.sexo;
                    crud.innerHTML  ="<a class='botaoCrud' href=javascript:location.assign('funcionario.html?id="+i+"');>Editar</a><input type='button'class='botaoCrud' onclick='Excluir("+i+",this)' value='Excluir'>";
                }

            }//fim corpo tabela
        //fim storage
        }else{
            teste("Storage vazio");
            location.href="index.html";
        }
    }//fim Listar()










//----------------------------------------------------------//
//função pesquisa Funcionario
function pesquisaFunc(fun){
    
    for(var i=0; i<tamStorage();i++){
        chaveVF = sessionStorage.key(i);
        var obj     = JSON.parse(sessionStorage.getItem(chaveVF));
        
        if(obj.referencia == "F" ){
            if(obj.nome == fun){     
                var achou = obj.nome;
            }else{
                teste("Funcionário não cadastrado");
            }
        }
    }
    return achou;
}
//----------------------------------------------------------//
//função pesquisa NUM
function pesquisaNUM(valor){
    
    for(var i=0; i<tamStorage();i++){
        chaveVF  = sessionStorage.key(i);
        var obj = JSON.parse(sessionStorage.getItem(chaveVF));
        
        if(obj.referencia == "V" ){
            if(obj.rg == valor || obj.cpf == valor){     
                var achou = valor;
            }else{
                teste("CPF ou RG não cadastrado");
            }
        }
    }
    return achou;
}
            
//----------------------------------------------------------//
    
function Visita(numVisitante,nomeFuncionario,motivo){
    
    var dataAtual = new Date().toDateString();
    
    
    this.referencia         = "VF";
    this.numVisitante       = numVisitante;
    this.nomeFuncionario    = nomeFuncionario;
    this.motivo             = motivo;
    this.data               = dataAtual;
}

//----------------------------------------------------------//
//Cadastrar visitas
function CadastrarVF(param){
    
    // valores 
    var numVisitante    = document.getElementById("numVisitante").value;
    var nomeFuncionario = document.getElementById("nomeFuncionario").value;
    var motivo          = document.getElementById("motivo").value;

    if(pesquisaNUM(numVisitante) == numVisitante && pesquisaFunc(nomeFuncionario) == nomeFuncionario){ //
      
        var visita = new Visita(numVisitante,nomeFuncionario,motivo);

        var proximo = tamStorage();
        sessionStorage.setItem(proximo+1,JSON.stringify(visita));

        alert("Cadastro realizado com sucesso!");
        document.getElementById("numVisitante").value       = "";
        document.getElementById("nomeFuncionario").value    = "";
        document.getElementById("motivo").value             = "";
        
    }else{
        teste("Favor verificar cadastro do Visitante ou Funcionário");
    } 

     
}//fim cadastrar()


//----------------------------------------------------------//
//Pagina listar visitas
    function ListarVF(){
        if (tamStorage()>0){

            var tituloTabela = document.getElementById("titulo");
            var corpoTabela = document.getElementById("listar"); 

            /* Titulo */
            var linha           = tituloTabela.insertRow();
            var chave           = linha.insertCell();
            var numVisitante    = linha.insertCell();
            var nomeFuncionario = linha.insertCell();
            var motivo          = linha.insertCell();
            var data            = linha.insertCell();
            var crud            = linha.insertCell();

            chave.innerHTML             = "CODIGO";
            numVisitante.innerHTML      = "VISITANTE";
            nomeFuncionario.innerHTML   = "FUNCIONARIO";
            motivo.innerHTML            = "MOTIVO";
            data.innerHTML              = "DATA";
            crud.innerHTML              = "CRUD";
            
            /* Corpo Tabela*/
            for(var i=0; i<tamStorage();i++){
                chaveVF = sessionStorage.key(i);
                var obj     = JSON.parse(sessionStorage.getItem(chaveVF));
                //referencia visitante
                if(obj.referencia == "VF"){
                    var linha           = corpoTabela.insertRow();
                    var chave           = linha.insertCell();
                    var numVisitante    = linha.insertCell();
                    var nomeFuncionario = linha.insertCell();
                    var motivo          = linha.insertCell();
                    var data            = linha.insertCell();
                    var crud            = linha.insertCell();

                    chave.innerHTML             = chaveVF;
                    numVisitante.innerHTML      = obj.numVisitante;
                    nomeFuncionario.innerHTML   = obj.nomeFuncionario;
                    motivo.innerHTML            = obj.motivo;
                    data.innerHTML              = obj.data;
                    crud.innerHTML              ="<input type='button' class='botaoCrud' onclick='Excluir("+i+",this)' value='Excluir'>";
                }

            }//fim corpo tabela
        //fim storage
        }else{
            teste("Storage vazio");
            location.href="index.html";
        }
    }//fim Listar()