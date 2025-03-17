import React from "react";

const PolicyCard = ({ imgSrc, title, description }) => {
  return (
    <div className="card rounded-2xl border my-8 text-center dark:border-white border-[#E5E5E5] p-4">
      <img
        src={imgSrc}
        alt={title}
        className="m-auto py-3 h-20 dark:invert-100"
      />
      <h1 className="text-base md:text-lg lg:text-xl xl:text-2xl py-2 text-[#313131] font-bold dark:text-white">
        {title}
      </h1>
      <p className="px-5 md:px-8 lg:px-10 pb-5 pt-3 text-sm md:text-base lg:text-lg text-[#8E8E8E]">
        {description}
      </p>
    </div>
  );
};

const Policy = () => {
  const policies = [
    {
      imgSrc:
        "https://rokan-theme.myshopify.com/cdn/shop/files/org_policy1.png?v=1722913050",
      title: "Free Shipping",
      description:
        "Get complimentary ground shipping on every order. Don't love it? Send it back, on us.",
    },
    {
      imgSrc:
        "https://rokan-theme.myshopify.com/cdn/shop/files/org_policy2.png?v=1722913050",
      title: "100% Secure Payment",
      description:
        "Free returns within 10 days, please make sure the items are in undamaged condition.",
    },
    {
      imgSrc:
        "https://rokan-theme.myshopify.com/cdn/shop/files/org_policy3.png?v=1722913050",
      title: "SUPPORT 24/7",
      description:
        "We support customers 24/7, send us questions and we will solve for you immediately.",
    },
  ];

  return (
    <div className="policy grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-10 md:gap-4 w-full px-6 md:px-10 my-10">
      {policies.map((policy, index) => (
        <PolicyCard
          key={index}
          imgSrc={policy.imgSrc}
          title={policy.title}
          description={policy.description}
        />
      ))}
    </div>
  );
};

export default Policy;
