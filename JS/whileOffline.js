window.addEventListener('load', function() {
    function loadingAninamtion(){
        const loadingText = document.getElementById('loading-text');
        let counter = 0;
        setInterval(() => {
            switch (counter % 5) {
            case 0:
                loadingText.textContent = 'Connecting.';
                break;
            case 1:
                loadingText.textContent = 'Connecting..';
                break;
            case 2:
                loadingText.textContent = 'Connecting...';
                break;
            case 3:
                loadingText.textContent = 'Connecting....';
                break;
            case 4:
                loadingText.textContent = 'Connecting.....';
                break;
            }
            counter++;
        }, 500);
    }
    loadingAninamtion()
    window.addEventListener('online', function() {
        history.back()
    });
});
  
  
  
  
  