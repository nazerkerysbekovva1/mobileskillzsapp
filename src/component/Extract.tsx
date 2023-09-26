
export const extract = (response: string) => {
    const regex = /<script.*?>(.*?)<\/script>/gs;
    const cleanResponse = response.replace(regex, '');
    // console.log(response);
    // console.log('content', cleanResponse);
    return cleanResponse
  }
  