import axios from 'axios'
export function initialize(store,router){
    router.beforeEach((to,from,next) =>{
        const requiresAuth = to.matched.some(record=>record.meta.requiresAuth);
        const curentCompany = store.getters.curentCompany;
        const currentUser = store.getters.curentUser;
        const url = process.env.VUE_APP_API_SOURCE;

        let subdomain = window.location.host.split('.')[0];
        //cek apakah sub domain yang diakses masih sama, 
        //jika tidak maka buatkan pengecekan nanti

        //check curentCompany null or no
        
        if (curentCompany==null){
            //alert('null');
            axios.get(''+url+'companyaccess')
                .then (function(resp){
                    //localStorage.setItem('company',JSON.stringify(resp.data.data));
                    //post here to get the token
                    let tempCompany = resp.data.data[0];
                    let send = {
                        grant_type : process.env.VUE_APP_GRANT_TYPE,
                        client_id : process.env.VUE_APP_CLIENT_ID,
                        client_secret : process.env.VUE_APP_CLIENT_SECRET,
                        username : resp.data.data[0].company_name,
                        password : resp.data.data[0].company_name,
                        scope : '*'
                    };
                    
                    axios.post(''+url+'oauth/token',send)
                    .then(function(ress){
                       
                        store.state.curentCompany = Object.assign(tempCompany,{
                            token_type : ress.data.token_type,
                            access_token : ress.data.access_token,
                            refresh_token : ress.data.refresh_token
                        });
                        localStorage.setItem('company',JSON.stringify(store.state.curentCompany));
                    })
                    .catch(function(error){
                        console.log(error);
                    });

                })
                .catch(function (error) {
                    console.log(error);
                })
        }
        
        if (requiresAuth && !currentUser){
            //alert("disini1");  
            next('/login');
        }else if (to.path=='/login' && currentUser){   
            //alert("disini");       
            next('/home');
        }else if (to.path=='/' && !currentUser){
            //alert("disini3"); 
            next('/login');
        }else if (to.path=='/' && currentUser){
            //alert("disini3"); 
            next('/home');
        }else{
            //alert("disini2");  
            next();
        } 

        //nanti disempurnakan lagi
        axios.interceptors.response.use(null,(error)=>{   
            
            //store.dispatch('logout');
            router.push('/logout');
            
            return Promise.reject(error);
        });

        
    })
}