const parseArgs = () => {
  console.log(
    process.argv
      .reduce((acc, curVal, i, arr) => {
        if (String(curVal).startsWith("--"))
          acc.push(`${curVal} is ${arr[i + 1]}`);
        return acc;
      }, [])
      .join("; ")
  );
};

parseArgs();
