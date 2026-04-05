let liste = document.getElementById("liste");

// Sayfa açılınca çalışır
window.onload = function () {
    let veriler = JSON.parse(localStorage.getItem("ilaclar")) || [];

    veriler.forEach(function (item) {
        listeyeEkle(item.ad, item.stok);
    });

    // ENTER ile ekleme
    document.getElementById("ilac").addEventListener("keydown", function(e) {
        if (e.key === "Enter") {
            e.preventDefault();
            ekle();
        }
    });
};

// İlaç ekleme
function ekle() {
    let input = document.getElementById("ilac");
    let stokInput = document.getElementById("stok");

    let ilac = input.value.trim();
    let stok = stokInput.value.trim();

    if (ilac === "" || stok === "") return;

    listeyeEkle(ilac, stok);

    let veriler = JSON.parse(localStorage.getItem("ilaclar")) || [];
    veriler.push({ ad: ilac, stok: stok });
    localStorage.setItem("ilaclar", JSON.stringify(veriler));

    input.value = "";
    stokInput.value = "";
}

// Listeye ekleme
function listeyeEkle(ilac, stok) {
    let li = document.createElement("li");
    li.textContent = ilac + " - Stok: " + stok + " ";

    // ✏️ düzenle
    let editBtn = document.createElement("button");
    editBtn.textContent = "Düzenle";

    editBtn.onclick = function () {
        let yeni = prompt("Yeni ilaç adı:", ilac);

        if (yeni !== null && yeni.trim() !== "") {
            li.childNodes[0].nodeValue = yeni + " - Stok: " + stok + " ";
            guncelleLocal(ilac, yeni);
            ilac = yeni;
        }
    };

    // ❌ sil
    let silBtn = document.createElement("button");
    silBtn.textContent = "Sil";

    silBtn.onclick = function () {
        li.remove();
        silLocal(ilac);
    };

    li.appendChild(editBtn);
    li.appendChild(silBtn);
    liste.appendChild(li);
}

// 🔍 Arama
function ara() {
    let filtre = document.getElementById("arama").value.toLowerCase();
    let liList = document.getElementsByTagName("li");

    for (let i = 0; i < liList.length; i++) {
        let text = liList[i].textContent.toLowerCase();

        if (text.includes(filtre)) {
            liList[i].style.display = "";
        } else {
            liList[i].style.display = "none";
        }
    }
}

// ❌ Local'dan sil
function silLocal(ilac) {
    let veriler = JSON.parse(localStorage.getItem("ilaclar")) || [];
    veriler = veriler.filter(item => item.ad !== ilac);
    localStorage.setItem("ilaclar", JSON.stringify(veriler));
}

// ✏️ Local'da güncelle
function guncelleLocal(eski, yeni) {
    let veriler = JSON.parse(localStorage.getItem("ilaclar")) || [];

    veriler = veriler.map(item => {
        if (item.ad === eski) {
            return { ad: yeni, stok: item.stok };
        }
        return item;
    });

    localStorage.setItem("ilaclar", JSON.stringify(veriler));
}