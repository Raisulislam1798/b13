let allDataArr = []

const displayCards = (isshus) => {
    const container = document.getElementById("issue-container")
    container.innerHTML = ""
    let cardHtml = ""
    for (const item of isshus) {
        cardHtml += `<div onclick="modal(${item.id})" class="card bg-white border border-gray-200 border-t-5 ${item.status==='open'? 'border-t-emerald-500':'border-t-purple-500' } rounded-2xl p-5 shadow-sm hover:shadow-md transition">
        <!-- Top Status & Priority -->
        <div class="flex justify-between items-center mb-3">
            <img class="size-5" 
             src="${item.status === 'open' ? './assets/Open-Status.png' : './assets/Closed- Status .png'}" 
             alt="${item.status}">
            <span class="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${item.priority === 'high' ? 'bg-rose-100 text-rose-500' : item.priority === 'medium' ? 'bg-amber-100 text-amber-600' : 'bg-gray-100 text-gray-500'}">
                ${item.priority || 'LOW'}
            </span>
        </div>

        <!-- Title & Description -->
        <h3 class="font-bold text-gray-800 text-base mb-2 line-clamp-1">${item.title}</h3>
        <p class="text-gray-400 text-sm mb-4 line-clamp-2">
            ${item.description || 'No description provided for this issue...'}
        </p>

        <!-- Labels/Tags -->
        <div class="flex flex-wrap gap-2 mb-4">
            <span class="px-2.5 py-1 bg-rose-50 text-rose-500 text-xs font-semibold rounded-md border border-rose-100">
                 BUG
            </span>
            <span class="px-2.5 py-1 bg-amber-50 text-amber-600 text-xs font-semibold rounded-md border border-amber-100">
                HELP WANTED
            </span>
        </div>

        <!-- Footer Info -->
        <div class="text-xs text-gray-400 border-t border-gray-100 pt-3 flex flex-col gap-1">
            <span>#${item.id} by <strong class="text-gray-600">${item.author || 'john_doe'}</strong></span>
            <span>${item.createdAt}</span>
        </div>
    </div>`

    }
    container.innerHTML = cardHtml

}

const btnOpen = () => {
    const openIssues = allDataArr.filter(item => item.status === 'open');
    
    document.getElementById("totalCount").innerText = openIssues.length;
    
    displayCards(openIssues);
}

const btnClosed = () => {
    const closedIssues = allDataArr.filter(item => item.status === 'closed');
    
    document.getElementById("totalCount").innerText = closedIssues.length;
    
    displayCards(closedIssues);
}

const modal=(issueId)=>{
    
        const singleIssue = allDataArr.find(item => item.id == issueId);

    if (singleIssue) {
        // ২. মোডালের ভেতরের div-এ ডাটা বসানো
        const modalContainer = document.getElementById("myModal");
        modalContainer.innerHTML = `
            <h2 class="text-2xl font-bold text-gray-900 mb-3 leading-snug">
                ${singleIssue.title}
            </h2>

            <div class="flex items-center gap-2 text-sm text-gray-500 mb-4 flex-wrap">
                <span class="px-3 py-1 ${singleIssue.status === 'open' ? 'bg-emerald-500' : 'bg-purple-600'} text-white rounded-full text-xs font-medium capitalize">
                    ${singleIssue.status || 'Opened'}
                </span>
                <span>•</span>
                <span>Opened by <strong class="text-gray-700 font-medium">${(singleIssue.author || 'Fahim Ahmed').replaceAll('_',' ')}</strong></span>
                <span>•</span>
                <span>22/02/2026</span>
            </div>

            <div class="flex gap-2 mb-6 flex-wrap">
                <span class="px-3 py-1 bg-red-50 text-red-500 border border-red-200 rounded-full text-xs font-semibold uppercase flex items-center gap-1">
                    BUG
                </span>
                <span class="px-3 py-1 bg-amber-50 text-amber-600 border border-amber-200 rounded-full text-xs font-semibold uppercase flex items-center gap-1">
                     HELP WANTED
                </span>
            </div>

            <p class="text-gray-500 text-sm leading-relaxed mb-6">
                ${singleIssue.description || 'No description provided for this issue.'}
            </p>

            <div class="bg-slate-50 rounded-xl p-5 flex justify-between items-center">
                <div>
                    <span class="block text-xs text-gray-400 font-medium mb-1">Assignee:</span>
                    <span class="font-bold text-gray-900 text-base">
                        ${(singleIssue.author || 'Fahim Ahmed').replaceAll('_', ' ')}
                    </span>
                </div>
                
                <div>
                    <span class="block text-xs text-gray-400 font-medium mb-1">Priority:</span>
                    <span class="px-3 py-1 rounded-full text-xs font-bold text-white uppercase inline-block text-center ${
                        singleIssue.priority === 'high' ? 'bg-red-500' : 
                        singleIssue.priority === 'medium' ? 'bg-amber-500' : 'bg-gray-400'
                    }">
                        ${singleIssue.priority || 'HIGH'}
                    </span>
                </div>
                    
            </div>

            <div class="modal-action mt-6">
            <form method="dialog">
              <button class="btn btn-primary">Close</button>

                
            </form>
            </div>
        `;

        // ৩. মোডাল পপআপ করানো
        const modalDialog = document.getElementById("my_modal_5"); // আপনার HTML-এর dialog id
        modalDialog.showModal();
    }

    my_modal_5.showModal()
}

const btnall = () => {

    const datalength = document.getElementById("totalCount").innerText = allDataArr.length
    displayCards(allDataArr);
}

const loadscreen = () => {
    const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues"
    fetch(url)
        .then(rest => rest.json())
        .then(json => {
            allDataArr = json.data
            btnall()
        })
}
loadscreen()