const getContent = async () => {
    const headers = {
      "content-type": "application/json",
    };
  
    const cats = [
      "facts",
      "quiz",
      "events",
      "recyclingServices",
      "dumpedRubbishInfo",
    ];
    const data = Object.fromEntries(cats.map((cat) => [cat, ""]));
  
    for (let i = 0; i < cats.length; i++) {
      const resapi = await fetch(
        `/api/${cats[i]}`,
        {
          method: "GET",
          headers: headers,
        }
      );
      data[cats[i]] = await resapi.json();
    }
  
    return {
      props: {
        data: {
          facts: Object.keys(data.facts).length !== 0 ? data.facts : [],
          quiz: Object.keys(data.quiz).length !== 0 ? data.quiz : [],
          events: Object.keys(data.events).length !== 0 ? data.events : [],
          recyclingServices:
            Object.keys(data.recyclingServices).length !== 0
              ? data.recyclingServices
              : [],
          dumpedRubbishInfo:
            Object.keys(data.dumpedRubbishInfo).length !== 0
              ? data.dumpedRubbishInfo[0]
              : [],
        },
      },
    };
  };


  export default getContent;
