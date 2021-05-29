// using System;
// using System.Threading;
// using System.Threading.Tasks;
// using Domain;
// using MediatR;
// using Persistence;

// namespace Application.Step
// {
//     public class ReadSteps
//     {
//             public class Query : IRequest<Steps>
//         {
//             public Guid Id { get; set; }
//         }

//         public class Handler : IRequestHandler<Query, Steps>
//         {
//             private readonly DataContext _context;

//             public Handler(DataContext context)
//             {
//                 _context = context;

//             }
//             public async Task<Steps> Handle(Query request, CancellationToken cancellationToken)
//             {
//                     return await _context.Stepss.FindAsync(request.Id);

//             }

//         }
//     }
// }