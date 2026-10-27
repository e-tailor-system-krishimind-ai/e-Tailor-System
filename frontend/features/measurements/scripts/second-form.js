let currentDress = "";

const dressFields = {
  shirt: ["chest","waist","length","sleeve"],
  pant: ["waist","hip","thigh","length","bottom"],
  suit: ["coatChest","coatLength","shoulder","sleeve","fit"],
  blouse: ["bust","waist","blouseLength","sleeve","neckDepth"],
  kurti: ["bust","waist","hip","kurtiLength","sleeve"]
};

const labels = {
  chest: "Chest (inch)",
  waist: "Waist (inch)",
  length: "Length (inch)",
  sleeve: "Sleeve Length (inch)",
  hip: "Hip (inch)",
  thigh: "Thigh (inch)",
  bottom: "Bottom (inch)",
  coatChest: "Coat Chest (inch)",
  coatLength: "Coat Length (inch)",
  shoulder: "Shoulder (inch)",
  fit: "Fit Type",
  bust: "Bust (inch)",
  blouseLength: "Blouse Length (inch)",
  neckDepth: "Neck Depth (inch)",
  kurtiLength: "Kurti Length (inch)"
};

function selectDress(){
  currentDress = document.getElementById("dressSelect").value;
  const container = document.getElementById("fieldsContainer");
  container.innerHTML = "";

  if(!currentDress) return;

  dressFields[currentDress].forEach(f=>{
    if(f === "fit"){
      const lbl = document.createElement("label");
      lbl.innerText = labels[f];
      const sel = document.createElement("select");
      sel.id = f;
      sel.onchange = updateReplica;
      sel.innerHTML = `<option>Slim</option><option>Regular</option>`;
      container.appendChild(lbl);
      container.appendChild(sel);
    } else {
      const lbl = document.createElement("label");
      lbl.innerText = labels[f];

      const row = document.createElement("div");
      row.className = "input-row";

      const range = document.createElement("input");
      range.type = "range";
      range.min = 20;
      range.max = 60;
      range.value = 36;
      range.id = f+"Range";
      range.oninput = ()=>syncRange(f);

      const num = document.createElement("input");
      num.type = "number";
      num.min = 20;
      num.max = 60;
      num.value = 36;
      num.id = f+"Num";
      num.oninput = ()=>syncNumber(f);

      row.appendChild(range);
      row.appendChild(num);
      container.appendChild(lbl);
      container.appendChild(row);
    }
  });

  resetReplica();
}

function syncRange(f){
  document.getElementById(f+"Num").value =
  document.getElementById(f+"Range").value;
  updateReplica();
}

function syncNumber(f){
  document.getElementById(f+"Range").value =
  document.getElementById(f+"Num").value;
  updateReplica();
}

function updateReplica(){
  const r = document.getElementById("replica");

  if(currentDress === "shirt"){
    r.style.width = chestNum.value*4+"px";
    r.style.height = lengthNum.value*6+"px";
    r.style.borderRadius = waistNum.value+"px";
  }

  if(currentDress === "pant"){
    r.style.width = waistNum.value*4+"px";
    r.style.height = lengthNum.value*6+"px";
    r.style.borderRadius = thighNum.value+"px";
  }

  if(currentDress === "suit"){
    let w = coatChestNum.value*4;
    if(fit.value==="Slim") w-=10;
    r.style.width = w+"px";
    r.style.height = coatLengthNum.value*6+"px";
    r.style.borderRadius = shoulderNum.value+"px";
  }

  if(currentDress === "blouse"){
    r.style.width = bustNum.value*4+"px";
    r.style.height = blouseLengthNum.value*5+"px";
    r.style.borderRadius = waistNum.value+"px";
  }

  if(currentDress === "kurti"){
    r.style.width = bustNum.value*4+"px";
    r.style.height = kurtiLengthNum.value*6+"px";
    r.style.borderRadius = hipNum.value+"px";
  }
}

function resetReplica(){
  const r = document.getElementById("replica");
  r.style.width = "160px";
  r.style.height = "220px";
  r.style.borderRadius = "12px";
}
