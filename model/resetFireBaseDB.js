const { remove, ref, set } = require("firebase/database");
const uniqid = require("uniqid");
const { db } = require("../config/firebaseConfig");

async function resetFireBaseDB() {
  remove(ref(db));

  const yogaID = uniqid();
  const meditationID = uniqid();
  const sophroID = uniqid();

  const stressID = uniqid();
  const grossesseID = uniqid();
  const sommeilID = uniqid();

  const clientID1 = uniqid();
  const clientID2 = uniqid();
  const clientID3 = uniqid();

  const praticionerID1 = "yCxZx9y1f3aKWUGYEnUKh5XBeOa2";
  const praticionerID2 = "OxlCRIlPNaMAytZ7dSiGS9CIYKK2";

  const seanceID1 = uniqid();
  const seanceID2 = uniqid();
  const seanceID3 = uniqid();
  const seanceID4 = uniqid();

  await set(ref(db, "methods/" + yogaID), {
    id: yogaID,
    name: "yoga",
  });
  await set(ref(db, "methods/" + meditationID), {
    id: meditationID,
    name: "meditation",
  });
  await set(ref(db, "methods/" + sophroID), {
    id: sophroID,
    name: "sophrologie",
  });

  await set(ref(db, "thematics/" + stressID), {
    id: stressID,
    name: "stress",
  });
  await set(ref(db, "thematics/" + grossesseID), {
    id: grossesseID,
    name: "grossesse",
  });
  await set(ref(db, "thematics/" + sommeilID), {
    id: sommeilID,
    name: "sommeil",
  });

  await set(ref(db, "clients/" + clientID1), {
    id: clientID1,
    firstname: "Nicolas",
    lastname: "Cha",
    email: "client1@gmail.com",
    seance: [seanceID1],
    avatar_url: "",
  });

  await set(ref(db, "clients/" + clientID2), {
    id: clientID2,
    firstname: "Pedro",
    lastname: "Shanchez",
    email: "client2@gmail.com",
    seances: [seanceID1],
    avatar_url: "",
  });

  await set(ref(db, "clients/" + clientID3), {
    id: clientID3,
    firstname: "Léo",
    lastname: "Lab",
    email: "client3@gmail.com",
    seances: [seanceID2],
    avatar_url: "",
  });

  await set(ref(db, "practitioners/" + praticionerID1), {
    id: praticionerID1,
    firstname: "Benjamin",
    lastname: "X",
    email: "bx@gmail.com",
    adress: "",
    description: "",
    clients: [clientID1, clientID2],
    seance: [seanceID1],
    phone: "+33 6 00 00 00 00",
    fb_url: "www.facebook.com",
    insta_url: "www.instagram.com",
    website_url: "www.monsiteperso.fr",
    avatar_url: "",
  });

  await set(ref(db, "practitioners/" + praticionerID2), {
    id: praticionerID2,
    firstname: "Jean-Marie",
    lastname: "X",
    email: "jmx@gmail.com",
    adress: "",
    description: "",
    clients: [clientID3],
    seance: [seanceID2],
    phone: "+33 6 00 00 00 00",
    fb_url: "www.facebook.com",
    insta_url: "www.instagram.com",
    website_url: "www.monsiteperso.fr",
    avatar_url: "",
  });

  await set(ref(db, "seances/" + praticionerID1 + "/" + seanceID1), {
    id: seanceID1,
    title: "Découverte méditation",
    description:
      "Lorem ipsum dolor sit amet. Eos voluptate sint qui veniam maiores a sunt quibusdam. Ut laborum quis aliquam vero aut iste temporibus et enim placeat est facere omnis. Eum ducimus quidem qui voluptatem enim et enim obcaecati et quae atque est quidem cumque et delectus nisi.",
    media_url:
      "gs://zenegopro.appspot.com/dev/data/practitioner_id/seance_id/mixkit-birds-in-the-jungle-2434.wav",
    members: [clientID1, clientID2],
    thematic_id: stressID,
    method_id: meditationID,
  });

  await set(ref(db, "seances/" + praticionerID1 + "/" + seanceID3), {
    id: seanceID3,
    title: "Méditation débutant",
    description:
      "Lorem ipsum dolor sit amet. Eos voluptate sint qui veniam maiores a sunt quibusdam. Ut laborum quis aliquam vero aut iste temporibus et enim placeat est facere omnis. Eum ducimus quidem qui voluptatem enim et enim obcaecati et quae atque est quidem cumque et delectus nisi.",
    media_url: "",
    members: [clientID3],
    thematic_id: sommeilID,
    method_id: sophroID,
  });

  await set(ref(db, "seances/" + praticionerID1 + "/" + seanceID4), {
    id: seanceID4,
    title: "Méditation pour les pros !",
    description:
      "Lorem ipsum dolor sit amet. Eos voluptate sint qui veniam maiores a sunt quibusdam. Ut laborum quis aliquam vero aut iste temporibus et enim placeat est facere omnis. Eum ducimus quidem qui voluptatem enim et enim obcaecati et quae atque est quidem cumque et delectus nisi.",
    media_url: "",
    members: [clientID3],
    thematic_id: sommeilID,
    method_id: sophroID,
  });

  await set(ref(db, "seances/" + praticionerID2 + "/" + seanceID2), {
    id: seanceID2,
    title: "Mieux dormir",
    description:
      "Lorem ipsum dolor sit amet. Eos voluptate sint qui veniam maiores a sunt quibusdam. Ut laborum quis aliquam vero aut iste temporibus et enim placeat est facere omnis. Eum ducimus quidem qui voluptatem enim et enim obcaecati et quae atque est quidem cumque et delectus nisi.",
    media_url: "",
    members: [clientID3],
    thematic_id: sommeilID,
    method_id: sophroID,
  });
}

resetFireBaseDB();
