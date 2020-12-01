#include <iostream>
using namespace std;
main(){
    string login;
    int senha, setor, cargo;
    
    cout << "login: ";
    cin >> login;
    
    cout << "senha: ";
    cin >> senha;
	//aqui é verificado se o logio esta correto
    if(login != "wisley"){
        cout <<"\nlogin incorreto";
    }else if(senha != 123){
        cout <<"\nsenha incorreta";
    }else {
        cout << "Digite o numero do seu setor: ";
        cin >> setor;
        
        switch(setor){
        	case 1:
        		cout << "Administracao";
        	break;
        	case 2:
        		
				
				
				cout << "Tecnologia";
        		cout << "\nDigite o numero do seu cargo: ";
		        cin >> cargo;
		        
		        switch(cargo){
		        	case 1:
		        		cout << "Programador";
		        	break;
		        	case 2:
		        		cout << "Segurancao";
		        	break;
		        	
		        	default:
		        		cout << "Cargo nao encontrado";
				}
				
				
        	break;
        	case 3:
        		cout << "RH";
        	break;
        	
        	default:
        		cout << "Setor nao encontrado";
		}   
    }
}
